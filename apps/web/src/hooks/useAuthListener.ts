import { supabase } from "@web/supabase/supabaseClient";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { USER_KEY } from '../queries/auth.queries'

export default function useAuthListener() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                if (queryClient.getQueryData(USER_KEY)) return
                navigate('/')
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