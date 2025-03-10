import { NextResponse } from "next/server";
import axios from "axios";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const id = searchParams.get("state"); // This is the QBO Sheet Connect table record ID

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    // Exchanging the authorization code for an access token
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = tokenResponse.data;

    // Fetch the user's email using the access token
    let userEmail = null;
    try {
      const userInfoResponse = await axios.get(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      userEmail = userInfoResponse.data.email;
      console.log("Retrieved user email:", userEmail);
    } catch (emailError) {
      console.error("Error fetching user email:", emailError);
      // Continue with the flow even if email fetch fails
    }

    // Getting sheettoken table id
    const { data: qboConnectionData, error: connectionError } = await supabase
      .from("QBO Sheet Connect")
      .select("sheets_token_id")
      .eq("id", id);

    // Check for errors in the first query
    if (connectionError) {
      console.error("Error fetching QuickBooks connection:", connectionError);
      return NextResponse.json(
        { error: "Error fetching connection data" },
        { status: 500 }
      );
    }

    // Extract the token ID to use in the update query
    const tokenIdToUpdate = qboConnectionData[0]?.sheets_token_id;

    if (!tokenIdToUpdate) {
      console.error("No sheets token ID found in the connection data");
      return NextResponse.json(
        { error: "No sheets token ID found" },
        { status: 404 }
      );
    }

    // Update the tokens and email in sheetstoken table
    const updateData = {
      access_token,
      refresh_token
    };

    // Only add email to the update if we successfully retrieved it
    if (userEmail) {
      updateData.email = userEmail;
    }

    const { data: tokenData, error: tokenError } = await supabase
      .from("sheetstoken")
      .update(updateData)
      .eq("id", tokenIdToUpdate);

    if (tokenError) {
      console.error("Error saving Google Sheets tokens:", tokenError);
      return NextResponse.json(
        { error: "Failed to save Google Sheets tokens" },
        { status: 500 }
      );
    }

    // Update the connection status in QBO Sheet Connect table
    const { data: updatedData, error: updatedError } = await supabase
      .from("QBO Sheet Connect")
      .update({
        gsheets_connection_complete: true,
      })
      .eq("id", id);

    if (updatedError) {
      console.error("Error updating connection status:", updatedError);
      // Note: Tokens were already saved, so this is a partial success
      return NextResponse.json(
        { error: "Failed to update connection status" },
        { status: 500 }
      );
    }

    // Redirect the user back to the dashboard with the connection ID
    return NextResponse.redirect(
      new URL(`/edit-connection/${id}`, request.url)
    );
  } catch (error) {
    console.error("Error during Google token exchange:", error);
    return NextResponse.json(
      {
        error: "Failed to authenticate with Google",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
