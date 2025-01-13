import React, { useEffect } from "react";
import useGetQuery from "./api/useGetQuery";
import Autocomplete from "./autocomplete/Autocomplete";
import { ItemArray } from "./autocomplete/types";


type ApiModel = { userId: number, id: number, title: string };
export default function ApiExample() {
    const { get, result: albums, isLoading, isError } = useGetQuery<ItemArray<ApiModel>>();

    useEffect(() => {
        get("https://jsonplaceholder.typicode.com/albums")
    }, [])

    const data = albums?.map(x => ({
        ...x,
        key: x.id.toString()
    })) as ItemArray<ApiModel>;

    return <div className="section">
        <h3>Api example</h3>
        <label>
            <i>
                You could also <a href="https://developer.chrome.com/docs/devtools/settings/throttling">throttle</a> the request with the devtools on chrome
            </i>
        </label>

        <Autocomplete items={data || []}
            label='Albums'
            isLoading={isLoading}
            isError={isError}
            clearOnScape={true}
            closeOnNavigationSelection={true}
            getLabel={x => x.title} />
    </div>
}