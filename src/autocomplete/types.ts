export type KeyType = { key: string, [key : string] : any };
export type ItemArray<TType> = Array<TType & KeyType>;
export type ResultItems<TType> = ItemArray<TType & KeyType & { hightlight?: boolean }>;