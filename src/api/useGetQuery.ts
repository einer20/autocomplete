import { useEffect, useState } from "react";


/**
 * Hook that execute a simple http get query
 * @param url Url to perform the query
 */
export default function useGetQuery<TResult>(){

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [result, setResult] = useState<TResult>();

    const executeQueyr = async (url : string)=>{
        try{
            setIsLoading(true);
            const result = await fetch(url, {
                method: 'GET',
            }).then(x=>x.json());

            setResult(result as TResult);
            setIsError(false);

        } catch {
            setIsError(true);
        }
        finally {
            setIsLoading(false);
        }
    }

    return {
        result,
        isError,
        isLoading,
        get: executeQueyr
    }
}