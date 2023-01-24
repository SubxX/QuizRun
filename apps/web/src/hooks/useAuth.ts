import { supabase } from "@web/supabase/supabaseClient";
import { useCallback } from "react";

export default function useAuth() {
    const signup = useCallback(
        async (email, password) => {
            const { error, data } = await supabase.auth.signUp({
                email, password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/email-confirmed`
                }
            })
            if (error) throw new Error(error?.message, { cause: error })
            return data
        },
        [],
    )

    const signin = useCallback(
        async (email, password) => {
            const { error, data } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw new Error(error?.message, { cause: error })
            return data
        },
        [],
    )

    const signout = useCallback(
        async () => {
            const { error } = await supabase.auth.signOut()
            if (error) throw new Error(error?.message, { cause: error })
            return true
        },
        [],
    )

    return { signup, signin, signout }
}