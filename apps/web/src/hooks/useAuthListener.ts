import { supabase } from "@web/supabase/supabaseClient";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function useAuthListener() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {
        const redirectableRoutes = ['/auth/signin']

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                if (!redirectableRoutes.includes(location.pathname)) return
                navigate('/', { replace: true })
            }

            if (event === 'SIGNED_OUT') {
                queryClient.removeQueries()
            }
        })

        return () => {
            listener.subscription.unsubscribe()
        }

    }, [])
}