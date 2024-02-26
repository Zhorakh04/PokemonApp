export interface IPokemonReqListItem {
    name: string;
    url: string;
}

export interface IPokemonReqTypedListItem {
    pokemon: {
        name: string;
        url: string;
    };
}

export interface IPokemonStoreData {
    data: null | IPokemonReqTypedListItem[] | IPokemonReqListItem[];
    error?:string
}

export type TData = IPokemonReqTypedListItem[] | IPokemonReqListItem[];

export interface IPokemonFiltedData {
    data: TData | null;
    sortedMethod: string;
    searchingValue: string;
}
