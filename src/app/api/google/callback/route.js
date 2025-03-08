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

    // getting sheettoken table id
    const { data: qboConnectionData, error: connectionError } = await supabase
      .from("QBO Sheet Connect")
      .select("sheets_token_id")
      .eq("id", id);

    // Check for errors in the first query
    if (connectionError) {
      console.error("Error fetching QuickBooks connection:", connectionError);
      return;
    }

    // Extract the token ID to use in the update query
    const tokenIdToUpdate = qboConnectionData[0]?.sheets_token_id;

    if (!tokenIdToUpdate) {
      console.error("No sheets token ID found in the connection data");
      return;
    }

    // 2. Insert the tokens into sheetstoken table
    const { data: tokenData, error: tokenError } = await supabase
      .from("sheetstoken")
      .update({
        access_token,
        refresh_token,
      })
      .eq("id",tokenIdToUpdate);

    if (tokenError) {
      console.error("Error saving Google Sheets tokens:", tokenError);
      return NextResponse.json(
        { error: "Failed to save Google Sheets tokens" },
        { status: 500 }
      );
    }

    // 3. Update the connection status in QBO Sheet Connect table
    const { data: updateData, error: updateError } = await supabase
      .from("QBO Sheet Connect")
      .update({
        gsheets_connection_complete: true,
      })
      .eq("id", id);

    if (updateError) {
      console.error("Error updating connection status:", updateError);
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
