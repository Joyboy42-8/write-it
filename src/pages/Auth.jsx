import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../supabaseClient";


export default function AuthPage() {
    return(
        <main className="Auth">
            <div className="AuthForm">
                <Auth 
                supabaseClient={supabase} 
                appearance={{ theme: ThemeSupa }}
                theme="dark"
                providers={["google", "github"]}
                />
            </div>
        </main>
    );
}