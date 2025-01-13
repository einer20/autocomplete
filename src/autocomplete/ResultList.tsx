import React from "react"
import { ResultItems } from "./types"
import { AutocompleteProps } from "./Autocomplete"

export type ResultListProps<TType> = {
    items: ResultItems<TType>,
    getLabel: AutocompleteProps<TType>["getLabel"],
    isLoading?: boolean;
    input: string;
    onSelect: (item: TType) => void;

}
export default function ResultList<T>(props: ResultListProps<T>) {


    /**
     * Hightlight the matching result by spliting the string
     * and adding the hightlighting to the word
     * @param x Item to get the label string from
     * @returns The react label element to render in the result
     */
    const getLabelInternal = (x: T) => {
        const l = props.getLabel(x);
        return l.split(new RegExp(`(${props.input})`, "gi")).map(x => {
            return x.toLocaleLowerCase() === props.input.toLocaleLowerCase() ? <span className="hightlighted">{x}</span> :
                <span>{x}</span>
        })
    }

    return <div className="results" role="dialog">
        <div role="listbox">
            {
                props.items.map(x => <div
                    role="listitem"
                    tabIndex={0}
                    className={`item ${x.hightlight ? 'a11y-hightlight' : ''}`}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            props.onSelect(x)
                    }}
                    onClick={() => props.onSelect(x)}
                    key={x.key}>{getLabelInternal(x)}</div>)
            }
            {props.items.length === 0 && <div className="not-found"><i>Results with <b>'{props.input}'</b> not found</i></div>}
            {props.isLoading && <div className="loading">Loading...</div>}
        </div>
    </div>
}