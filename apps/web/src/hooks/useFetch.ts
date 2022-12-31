import { useEffect, useState, DependencyList } from 'react';
import useLoader from './useLoader';


export default function useFetch<T>(apiCall: () => Promise<T>, deps: DependencyList = []) {
    const { loading, startLoading, stopLoading } = useLoader()
    const [data, setData] = useState<T>()
    const [error, setError] = useState<Error>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                startLoading();
                const data = await apiCall()
                setData(data);
                setError(undefined);
            } catch (error: any) {
                setData(undefined)
                setError(error);
            } finally {
                stopLoading();
            }
        };
        fetchData()
    }, deps)



    return { data, loading, error, mutateData: setData }
}
