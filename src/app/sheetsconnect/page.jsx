'use client'
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function SheetsConnects() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_GOOGLE_SCOPES}&access_type=offline&prompt=consent&state=${user.id}`;

  return (
    <div>
      <h1>You successfully connected to quickbooks</h1>
      <p>copy this template to your google sheets</p>

      <br />
      <br />
      <p>
        YOu can either continue with this email alreadydefinedemail@email.com or
        you can add new account by pressing button below
      </p>
      <a href={googleAuthUrl}>Authenticate</a>
    </div>
  );
}
