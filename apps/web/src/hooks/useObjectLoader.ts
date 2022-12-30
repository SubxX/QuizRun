import { useState, useCallback } from "react";

export default function useObjectLoader() {
    const [loaders, setLoaders] = useState<Record<string, boolean>>({});

    const createLoader = useCallback(
        (id: string) => {
            setLoaders((prev) => ({ ...prev, [id]: true }));
        },
        [],
    )

    const removeLoader = useCallback(
        (id: string) => {
            setLoaders((prev) => {
                const temp = { ...prev };
                delete temp[id];
                return temp;
            });
        },
        [],
    )

    return { createLoader, removeLoader, loaders }
}