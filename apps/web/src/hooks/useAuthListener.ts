import { supabase } from "@web/supabase/supabaseClient";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function useAuthListener() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {

        supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN') {
                navigate('/')
            }

            if (event === 'SIGNED_OUT') {
                queryClient.removeQueries()
            }
        })

    }, [])
}