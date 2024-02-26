import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    IPokemonFiltedData,
    IPokemonReqListItem,
    IPokemonReqTypedListItem,
    IPokemonStoreData,
    TData,
} from "../types/PokemonSliceTypes";

const sortItems = (data: any[], type: string) => {
    return [...data].sort((firstItem, secondItem) => {
        const getSortableItemId = (item: any) => {
            if (type.length < 5) {
                return item?.pokemon?.name
                    ? item.pokemon.name.toUpperCase()
                    : item.name.toUpperCase();
            } else {
                const url = item?.pokemon?.url || item.url;
                return url.split("/").filter(Boolean).pop();
            }
        };

        const firstItemId = getSortableItemId(firstItem);
        const secondItemId = getSortableItemId(secondItem);

        if (type === "AZ") {
            return firstItemId.localeCompare(secondItemId);
        } else if (type === "ZA") {
            return secondItemId.localeCompare(firstItemId);
        } else {
            return secondItemId - firstItemId;
        }
    });
};

interface IPokemonSlice {
    data: IPokemonStoreData | null;
    page: number;
    limit: number;
    filteredPokemonList: IPokemonFiltedData;
    scrollPoginationisActive: boolean;
}

const initialState: IPokemonSlice = {
    data: null,
    page: 1,
    limit: 20,
    filteredPokemonList: {
        data: null,
        sortedMethod: "",
        searchingValue: "",
    },
    scrollPoginationisActive: false,
};

const filterItems = (data: TData, str: string): TData => {
    if (!data) return [];
    const filteredData: (IPokemonReqTypedListItem | IPokemonReqListItem)[] = [];
    if (data instanceof Array) {
        for (const el of data) {
            if ("pokemon" in el) {
                if (el.pokemon.name.toUpperCase().includes(str.toUpperCase())) {
                    filteredData.push(el);
                }
            } else {
                if (el.name.toUpperCase().includes(str.toUpperCase())) {
                    filteredData.push(el);
                }
            }
        }
    }

    return filteredData as TData;
};

export const PokimonSlice = createSlice({
    name: "pokimons",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setFiltrationData: (state, action) => {
            if (
                !state.filteredPokemonList.searchingValue &&
                !state.filteredPokemonList.sortedMethod
            )
                return;

            let data = action.payload;
            if (state.filteredPokemonList.searchingValue) {
                state.filteredPokemonList.data = filterItems(
                    data.lenght ? data : action.payload,
                    state.filteredPokemonList.searchingValue
                );
            } else {
                state.filteredPokemonList.data = action.payload;
            }

            if (state.filteredPokemonList.sortedMethod) {
                state.filteredPokemonList.data = sortItems(
                    Array.isArray(state.filteredPokemonList.data)
                        ? state.filteredPokemonList.data
                        : [],
                    state.filteredPokemonList.sortedMethod
                );
            }
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.page = 1;
            state.filteredPokemonList.searchingValue = action.payload;
        },
        sortData: (state, action: PayloadAction<string>) => {
            if (action.payload === "lowestToHightes") {
                state.filteredPokemonList.sortedMethod = "";
                return;
            }
            state.filteredPokemonList.sortedMethod = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setLimit: (state, action) => {
            const tmp = state.limit * state.page;
            state.page =
                Math.ceil((tmp - state.limit) / +action.payload) < 1
                    ? 1
                    : Math.floor((tmp - state.limit) / +action.payload) + 1;
            state.limit = +action.payload;
        },
        setScrollPogination: (state, action) => {
            state.scrollPoginationisActive = action.payload;
        },
        setScrollLimit: (state) => {
            state.limit += 10;
            const tmp = state.limit * state.page;

            state.page =
                Math.ceil((tmp - state.limit) / state.limit) <= 1
                    ? 1
                    : Math.ceil((tmp - state.limit) / state.limit) + 1;
        },
    },
});

export default PokimonSlice.reducer;
export const {
    setData,
    setSearchValue,
    sortData,
    setPage,
    setLimit,
    setFiltrationData,
    setScrollLimit,
    setScrollPogination,
} = PokimonSlice.actions;
