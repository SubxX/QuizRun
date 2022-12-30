import { useEffect, useState, DependencyList } from 'react';


export default function useFetch<T>(apiCall: () => Promise<T>, deps: DependencyList = []) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T>()
    const [error, setError] = useState<Error>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await apiCall()
                setData(data);
                setError(undefined);
            } catch (error: any) {
                setData(undefined)
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData()
    }, deps)



    return { data, loading, error, mutateData: setData }
}
