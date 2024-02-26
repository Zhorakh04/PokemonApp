import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import PokemonItemImg from "../PokemonListItem/PokemonItemImg";
import NextEvolution from "../../assets/nextEvolution.svg";
import PokemonListItem from "../PokemonListItem";
import PokemonStats from "./PokemonStats";

// interface IPokemonSpecies {
//     PokemonSpecies:any
// }

export const PokemonItemEvolutinoChain = () => {
    const evolutionChainItems = useAppSelector(
        (state) => state.PokemonItemSlice.evolutionChainItems
    );
    const [allEvolutionChainItem, setAllEvolutionChainItem] = useState<any[]>([]);

    const getEvolutionChainItem = (obj: any) => {
        let objChecker = obj;
        const arr = [];
        let checker = true;

        // console.log(objChecker?.evolves_to[0]);
        while (checker) {
            arr.push(objChecker.species);
            objChecker = objChecker.evolves_to[0];
            if (!objChecker?.evolves_to.length) {
                arr.push(objChecker?.species);
                checker = false;
            }
        }
        setAllEvolutionChainItem([...arr]);
    };
    useEffect(() => {
        getEvolutionChainItem(evolutionChainItems.chain);
    }, []);

    console.log(allEvolutionChainItem);

    return (
        <div className="evolution_pokemons">
            <div>
                {allEvolutionChainItem.length &&
                    allEvolutionChainItem.map((el, idx) => {
                        return (
                            <>
                                <PokemonListItem url={el.url} name={el.name}/>
                                {allEvolutionChainItem[idx + 1] ? (
                                    <img
                                        className="evolution_next_item"
                                        src={NextEvolution}
                                        alt=""
                                    />
                                ) : (
                                    ""
                                )}
                            </>
                        );
                    })}
            </div>
        </div>
    );
};
