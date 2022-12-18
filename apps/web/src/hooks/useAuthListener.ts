import { useUserStore } from "@web/store/user.store";
import { supabase } from "@web/supabase/supabaseClient";
import { useEffect } from "react";

export default function useAuthListener() {
    const { set, clear } = useUserStore()

    useEffect(() => {

        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                session ? set(session) : clear()
            }

            if (event === 'SIGNED_OUT') {
                clear()
            }
        })

    }, [])
}