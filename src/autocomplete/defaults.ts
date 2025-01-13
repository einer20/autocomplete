import { ItemArray } from "./types";


/**
 * Default filter that filters the items by search in all props inside the array. 
 * @param items Items to filter
 */
export function defaultFilter<TType>(input : string, items : ItemArray<TType>) : Promise<ItemArray<TType>> {

    const lc = input.toLowerCase();
    const result = items.filter(x=>{
        for(let name in x) {
            const value = x[name] as string;
            if( (x as Object).hasOwnProperty(name) && value.toString().toLowerCase().includes(lc))
            {
                return true;
            }    
            // this algorithmon wont do deep object comparison
            // only 1 level object comparison. If there is a sub prop it wont be validated
        }
    
        return false;
    })

    return Promise.resolve(result);
}