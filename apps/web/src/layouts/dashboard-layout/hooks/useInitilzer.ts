import { useDepartmentStore } from "@web/store/department.store";
import { useCallback } from "react";

/**
 * @author Subham
 * @purpose we can call any function here that need to get invocked as soon as user logs in
 * @returns function
 */
export default function useInitilzer() {
    const { fetch: fetchDepartments } = useDepartmentStore()

    const initlize = useCallback(
        () => {
            fetchDepartments()
        },
        [],
    )
    return { initlize }
}