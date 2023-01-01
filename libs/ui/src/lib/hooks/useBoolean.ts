import { useState, useEffect, useRef, useCallback } from "react";

export default function useBoolean(defaultVal = false) {
    const [val, setVal] = useState(() => defaultVal)
    const mountStatus = useRef(true)

    useEffect(() => {
        return () => {
            mountStatus.current = false
        }
    }, [])

    const on = useCallback(
        () => {
            if (!mountStatus.current) return
            setVal(true)
        },
        [],
    )

    const off = useCallback(
        () => {
            if (!mountStatus.current) return
            setVal(false)
        },
        [],
    )

    const set = useCallback(
        (val: boolean) => {
            if (!mountStatus.current) return
            setVal(val)
        },
        [],
    )

    const toggle = useCallback(
        () => {
            if (!mountStatus.current) return
            setVal((prev) => !prev)
        },
        [],
    )

    return { value: val, on, off, set, toggle }
}