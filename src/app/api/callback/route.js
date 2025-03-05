import { NextResponse } from "next/server";
import axios from "axios";
import path from "path";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase credentials");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const user_id = searchParams.get("state");
    const realm_id = searchParams.get("realmId");

    console.log("Debugging info:", {
      user_id,
      realm_id,
      code: code ? "Code received" : "No code"
    });

    // QuickBooks token exchange logic (same as before)
    const tokenResponse = await axios.post(
      process.env.NEXT_PUBLIC_QUICKBOOKS_TOKEN_URL,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NEXT_PUBLIC_QUICKBOOKS_REDIRECT_URI,
      }),
      {
        auth: {
          username: process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID,
          password: process.env.QUICKBOOKS_CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = tokenResponse.data;

    // Detailed logging before Supabase insertion
    console.log("Preparing to insert:", {
      access_token: access_token ? "Token present" : "No token",
      refresh_token: refresh_token ? "Token present" : "No token",
      user_id,
      realm_id
    });

    // Comprehensive Supabase insertion with error handling
    const { data, error } = await supabase
      .from("qbotokens")
      .insert({
        access_token, 
        refresh_token, 
        realm_id, 
        user_id 
      });

    // Enhanced error logging
    if (error) {
      console.error("Detailed Supabase Error:", {
        message: error.message,
        details: error,
        code: error.code,
        hint: error.hint
      });

      return NextResponse.json(
        { 
          error: "Failed to save tokens", 
          details: {
            message: error.message,
            code: error.code
          }
        }, 
        { status: 500 }
      );
    }

    console.log("Tokens successfully saved to Supabase");

    // Redirect to the sheets connect page
    return NextResponse.redirect(new URL("/sheetsconnect", request.url));

  } catch (error) {
    // Comprehensive catch-all error handling
    console.error("Full Error Capture:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });

    return NextResponse.json(
      { 
        error: "Authentication process failed", 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}