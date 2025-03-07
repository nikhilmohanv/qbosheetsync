import { NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const user_id=searchParams.get("state")

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    // Exchange the authorization code for an access token
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

    console.log(access_token);
    console.log(refresh_token);

    const { data, error } = await supabase.from("sheetstoken").insert({
      access_token,
      refresh_token,
      user_id,
    });

    // Enhanced error logging
    if (error) {
      console.error("Detailed Supabase Error:", {
        message: error.message,
        details: error,
        code: error.code,
        hint: error.hint,
      });

      return NextResponse.json(
        {
          error: "Failed to save tokens",
          details: {
            message: error.message,
            code: error.code,
          },
        },
        { status: 500 }
      );
    }

    // Save the tokens to your database (Supabase)
    // Example:
    // const { data, error } = await supabase.from('google_tokens').insert([{ access_token, refresh_token }]);

    // Redirect the user back to the dashboard or another page
    return NextResponse.redirect("http://localhost:3000/dashboard");
  } catch (error) {
    console.error("Error during Google token exchange:", error);
    return NextResponse.json(
      { error: "Failed to authenticate with Google" },
      { status: 500 }
    );
  }
}
