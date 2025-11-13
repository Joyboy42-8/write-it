import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();

  }, []);


  return session ? <Home session={session} /> : <AuthPage />;
}