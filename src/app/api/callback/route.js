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

    const id = searchParams.get("state");
    const realm_id = searchParams.get("realmId");

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
      realm_id,
    });
    // First query: Get the quickbook_token_id from QBO Sheet Connect
    const { data: qboConnectionData, error: connectionError } = await supabase
      .from("QBO Sheet Connect")
      .select("quickbook_token_id")
      .eq("id", id);

    // Check for errors in the first query
    if (connectionError) {
      console.error("Error fetching QuickBooks connection:", connectionError);
      return;
    }

    // Extract the token ID to use in the update query
    const tokenIdToUpdate = qboConnectionData[0]?.quickbook_token_id;

    if (!tokenIdToUpdate) {
      console.error("No QuickBooks token ID found in the connection data");
      return;
    }

    // Second query: Update the qbotokens record with the matching ID
    const { data: updatedTokenData, error: updateError } = await supabase
      .from("qbotokens")
      .update({
        access_token,
        refresh_token,
        realm_id,
      })
      .eq("id", tokenIdToUpdate);

    console.log("QuickBooks token updated successfully:", updatedTokenData);

    // Enhanced error logging
    if (updateError) {
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
            message: updateError.message,
            code: updateError.code,
          },
        },
        { status: 500 }
      );
    }

    // Update the QBO Sheet Connect status after token update succeeds
    const { data: updatedConnectionData, error: statusUpdateError } =
      await supabase
        .from("QBO Sheet Connect")
        .update({
          qbo_connection_complete: true,
        })
        .eq("id", id);

    if (statusUpdateError) {
      console.error("Error updating connection status:", statusUpdateError);
    }

    console.log("Tokens successfully saved to Supabase");

    // Redirect to the edit connection page
    return NextResponse.redirect(
      new URL(`/edit-connection/${id}`, request.url)
    );
  } catch (error) {
    // Comprehensive catch-all error handling
    console.error("Full Error Capture:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });

    return NextResponse.json(
      {
        error: "Authentication process failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
