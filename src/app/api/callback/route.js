import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(
      process.env.NEXT_PUBLIC_QUICKBOOKS_TOKEN_URL,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.NEXT_PUBLIC_QUICKBOOKS_REDIRECT_URI,
      }),
      {
        auth: {
          username: process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID,
          password: process.env.QUICKBOOKS_CLIENT_SECRET,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token } = tokenResponse.data;
    console.log(access_token)
    console.log(refresh_token)

    // Save the tokens to your database (Supabase)
    // You can use Supabase client here to store the tokens
    // Example:
    // const { data, error } = await supabase.from('tokens').insert([{ access_token, refresh_token }]);

    // Redirect the user back to the dashboard or another page
    return NextResponse.redirect('/dashboard');
  } catch (error) {
    console.error('Error during token exchange:', error);
    return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 });
  }
}