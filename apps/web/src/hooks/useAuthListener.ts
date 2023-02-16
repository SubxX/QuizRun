import { supabase } from "@web/modules/supabaseClient";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

export default function useAuthListener() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { pathname } = useLocation()


    useEffect(() => {
        const redirectableRoutes = ['/auth/signin']

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                if (!redirectableRoutes.includes(pathname)) return
                navigate('/', { replace: true })
            }

            if (event === 'SIGNED_OUT') {
                queryClient.removeQueries()
            }
        })

        return () => {
            listener.subscription.unsubscribe()
        }

    }, [pathname])
}