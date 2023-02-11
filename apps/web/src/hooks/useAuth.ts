import { supabase } from "@web/supabase/supabaseClient";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "reapop";

export default function useAuth() {
    const { notify } = useNotifications();
    const navigate = useNavigate()

    const signup = useCallback(
        async (email, password, data = {}) => {
            const { error, data: response } = await supabase.auth.signUp({
                email, password,
                options: {
                    emailRedirectTo: `${window?.location.origin}/auth/email-confirmed`,
                    data
                },
            })
            if (error) {
                notify(error?.message ?? `Unable to create account`, 'error');
                throw new Error(error?.message, { cause: error })
            }
            notify(`Account created successfully!`, 'success');
            navigate('/')
            return response
        },
        [],
    )

    const login = useCallback(
        async (email, password) => {
            const { error, data } = await supabase.auth.signInWithPassword({ email, password })
            if (error) {
                notify(error?.message ?? `Unable to login`, 'error');
                throw new Error(error?.message, { cause: error })
            }
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

    return { signup, login, signout }
}