import { useEffect, useState, DependencyList } from 'react';
import { useBoolean } from '@quizrun/ui'


export default function useFetch<T>(apiCall: () => Promise<T>, deps: DependencyList = []) {
    const { value: loading, set: setLoading } = useBoolean()
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
