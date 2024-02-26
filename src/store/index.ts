import { combineReducers, configureStore } from "@reduxjs/toolkit";
import PokimonSlice from "./PokimonSlice";
import PokemonItemSlice from "./PokemonItemSlice";
import { pokemonApi } from "../service/pokemonService";

const rootReducers = combineReducers({
    PokimonSlice,
    PokemonItemSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
