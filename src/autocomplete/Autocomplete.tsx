import React, { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { ItemArray, ResultItems } from "./types";
import ResultList from "./ResultList";
import './autocomplete.css';
import { defaultFilter } from "./defaults";
import ClickAway from "./ClickAway";

export type AutocompleteProps<TType> = {
    items: ItemArray<TType>,

    /**
     * Trigger on item selection change
     * @param item Selected item
     * @returns void
     */
    onChange?: (item?: TType) => void;

    /**
     * Get the label to render on the result list
     * @param item Item from the array list
     * @returns The label to render on the result list
     */
    getLabel: (item: TType) => string;

    /**
     * Filters the items of the list based on the user input
     * @param input User input
     * @param items Item to filter
     * @returns A new instance of the filtered items
     */
    filter?: (input: string, items: ItemArray<TType>) => Promise<ItemArray<TType>>;

    /**
     * Set the autocomplete in error state
     */
    isError?: boolean;

    /**
     * Indicates if the autocomplete is in loading state
     */
    isLoading?: boolean

    /**
     * Autocomplete label
     */
    label: string;

    /***
     * If set, clears the input on Escape pressed
     */
    clearOnScape?: boolean;

    /***
     * If set, close the results dialog when an item is selected by using
     * the navigation keyboard(enter)
     */
    closeOnNavigationSelection?: boolean

}
export default function Autocomplete<TType>(props: AutocompleteProps<TType>) {
    const {
        items: defaultItems,
        filter,
        onChange,
        isError,
        getLabel,
        label,
        closeOnNavigationSelection,
        clearOnScape,
        isLoading: defaultIsLoading
    } = props;

    const [items, setItems] = useState<ResultItems<TType>>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<TType>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const MAX_ITEMS_TO_SHOW = 100;
    useEffect(() => {
        setItems(defaultItems.slice(0, MAX_ITEMS_TO_SHOW));
    }, [defaultItems])

    useEffect(() => {
        if (selectedItem)
            setUserInput(getLabel(selectedItem));

        if (onChange && selectedItem !== undefined)
            onChange(selectedItem);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItem]);

    useEffect(() => {
        setIsLoading(defaultIsLoading);
    }, [defaultIsLoading])


    const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserInput(value)
        setIsOpen(true)
        const result = filter ? await filter(value, defaultItems) : await defaultFilter(value, defaultItems);
        setItems(result.slice(0, MAX_ITEMS_TO_SHOW));
    }

    const onNavigationKeysPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const highlightedIndex = items.findIndex(x => x.hightlight);
        let newHightlightedIndex = -1;

        if (e.key === "ArrowDown") {
            newHightlightedIndex = highlightedIndex + 1;
        }
        else if (e.key === "ArrowUp" && highlightedIndex < items.length) {
            newHightlightedIndex = highlightedIndex - 1;
        }
        else if (e.key === "Enter" && highlightedIndex > -1) {
            setSelectedItem(items.at(highlightedIndex));
            if (closeOnNavigationSelection)
                setIsOpen(false)
        }
        else if (e.key === "Escape") {
            newHightlightedIndex = -1;
            items.at(highlightedIndex)!.hightlight = false;
            if (clearOnScape)
                setUserInput("")
        }

        if (typeof items[newHightlightedIndex] !== "undefined") {
            items.at(highlightedIndex)!.hightlight = false;
            items.at(newHightlightedIndex)!.hightlight = true;
        }

        setItems([...items]);
    }

    const onInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
        if ((e.target as HTMLInputElement).value.length > 0)
            setIsOpen(true);
    }

    const onSelect = (item: TType) => {
        if (closeOnNavigationSelection)
            setIsOpen(false);
        setSelectedItem(item)
    }

    const getExtraClasses = () => [
        isError ? 'error' : '',
        isLoading ? 'loading' : ''
    ].join('')

    return <ClickAway onClickAway={() => setIsOpen(false)}>
        <div className={`autocomplete ${getExtraClasses()}`}>
            <label>{label}</label>
            <div className="input">
                <input
                    placeholder={isLoading ? "Loading..." : "Type to search"}
                    disabled={isLoading}
                    type="text"
                    onClick={onInputClick}
                    onChange={onInputChange}
                    onKeyDown={onNavigationKeysPressed}
                    value={userInput} />
            </div>
            {isOpen &&
                <ResultList {...props} items={items} input={userInput} onSelect={onSelect} />
            }
        </div>
    </ClickAway>
}