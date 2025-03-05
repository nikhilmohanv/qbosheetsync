import { supabase } from '@/lib/supabase';

export default function AuthPage() {
  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'user@example.com',
      password: 'password',
    });
    if (error) console.error('Sign-up error:', error);
    else console.log('Signed up:', data);
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'user@example.com',
      password: 'password',
    });
    if (error) console.error('Sign-in error:', error);
    else console.log('Signed in:', data);
  };

  return (
    <div>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}