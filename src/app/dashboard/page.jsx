// app/dashboard/page.js
export default function Dashboard() {
  const quickbooksAuthUrl = `${process.env.NEXT_PUBLIC_QUICKBOOKS_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID}&response_type=code&scope=${process.env.NEXT_PUBLIC_QUICKBOOKS_SCOPE}&redirect_uri=${process.env.NEXT_PUBLIC_QUICKBOOKS_REDIRECT_URI}&state=usersome`;
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_GOOGLE_SCOPES}&access_type=offline&prompt=consent`;

  return (
    <div>
      <h1>Dashboard</h1>
      <a href={quickbooksAuthUrl}>
        <button>Connect QuickBooks</button>
      </a>

      <h1>Dashboard</h1>
      <a href={googleAuthUrl}>
        <button>Connect Google Sheets</button>
      </a>
    </div>
  );
}
