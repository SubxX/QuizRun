import { useState, useEffect, useRef, useCallback } from "react";

export default function useLoader(defaultVal = false) {
    const [loading, setloading] = useState(() => defaultVal)
    const mountStatus = useRef(true)

    useEffect(() => {
        return () => {
            mountStatus.current = false
        }
    }, [])

    const startLoading = useCallback(
        () => {
            if (!mountStatus.current) return
            setloading(true)
        },
        [],
    )

    const stopLoading = useCallback(
        () => {
            if (!mountStatus.current) return
            setloading(false)
        },
        [],
    )


    return { loading, startLoading, stopLoading }
}