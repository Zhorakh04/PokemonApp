import { FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPokemonReqListItem, IPokemonReqTypedListItem } from "../types/PokemonSliceTypes";
import axios from "axios";
import { SerializedError } from "@reduxjs/toolkit";
import { IPokemon } from "../types/IPokemon";

export const pokemonApi = createApi({
    reducerPath: "pokemonApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }), // Adjust baseUrl as needed
    endpoints: (builder) => ({
        PokimonItem: builder.query<IPokemon, string>({  
            query: (name) => ({
                url: "/pokemon/" + name,
            }),
        }),
        PokimonList: builder.query<IPokemonReqListItem[] | IPokemonReqTypedListItem[], string>({
            queryFn: async (url) => {
                try {
                    const res = await axios.get(url, {
                        params: {
                            limit: 800,
                        },
                    });
                    if (url.includes("type")) {
                        return { data: res.data.pokemon } as { data: IPokemonReqTypedListItem[] };
                    } else {
                        return { data: res.data.results } as { data: IPokemonReqListItem[] };
                    }
                } catch (error) {
                    throw error;
                }
            },
        }),
    }),
});

export const { usePokimonListQuery  ,usePokimonItemQuery} = pokemonApi;
