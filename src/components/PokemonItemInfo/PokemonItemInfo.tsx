import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { FC, useEffect, useState } from "react";
import {
    fetchPokemonEvolutionChainItem,
    fetchPokemonItem,
    fetchPokemonItemSpecies,
} from "../../store/ActionCreators";
import MyLoader from "../UI/MyLoader";
import PokemonListItemContent from "../PokemonListItem/PokemonListItemContent";
import "./PokemonItemInfo.css";
import PokemonItemImg from "../PokemonListItem/PokemonItemImg";
import { IPokemon } from "../../types/IPokemon";
import { PokemonItemEvolutinoChain } from "./PokemonItemEvolutinoChain";
import PokemonStats from "./PokemonStats";

interface IPokeomonItemProps {
    data: IPokemon;
}

const PokemonItemInfo: FC<IPokeomonItemProps> = ({ data }) => {
    const [pokemonInfo, setPokemonInfo] = useState({
        height: "",
        weight: 0,
    });
    const { PokemonSpecies, isLoading, evolutionChainItems } = useAppSelector(
        (state) => state.PokemonItemSlice
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!PokemonSpecies) {
            dispatch(fetchPokemonItemSpecies(data.name.toLocaleLowerCase()));
        }
        if (data) {
            const feet = (data?.height / 10) * 3.28084 + "";
            let tmp = +`${feet.split(".")[0]}.${+feet.split(".")[1] * 12}`;
            console.log(tmp.toFixed(1).split(".").join(`'`));
            const height = tmp.toFixed(1).split(".").join(`'`);

            setPokemonInfo({ weight: data?.weight / 10, height });
        }
    }, [data, PokemonSpecies]);

    useEffect(() => {
        if (PokemonSpecies) {
            dispatch(fetchPokemonEvolutionChainItem(PokemonSpecies.evolution_chain.url));
        }
    }, [PokemonSpecies]);

    if (isLoading) {
        console.log("loading");
        return <MyLoader />;
    }

    console.log(PokemonSpecies?.flavor_text_entries[1]);

    return (
        <div className="PokemonPage">
            <Link to={"/"}>← Explore more Pokémon</Link>
            <div>
                <h1>
                    {data?.name} #
                    {(data?.id < 10 && `00${data.id}`) ||
                        (data?.id < 100 && `0${data.id}`) ||
                        data?.id}
                </h1>
                <div className="pokemon_item_Info">
                    <div>
                        <PokemonItemImg
                            url={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
                        />
                    </div>
                    <div className="pokemon_item_Info_details">
                        <p>
                            {PokemonSpecies?.flavor_text_entries &&
                                PokemonSpecies?.flavor_text_entries[1]?.flavor_text.replace("", "")}
                        </p>
                        <div className="pokemon_item_Info_details_inner">
                            <div className="pokemon_item_Info_Item">
                                <p>Height</p>
                                {data?.height &&
                                    data?.height / 10 + "m" + `(${pokemonInfo?.height})`}
                            </div>
                            <div className="pokemon_item_Info_Item">
                                <p>Weight</p>
                                {data?.height &&
                                    pokemonInfo?.weight +
                                        "kg" +
                                        `(${(pokemonInfo?.weight * 2.20462).toFixed(1)}lbs)`}
                            </div>
                            <div className="pokemon_item_Info_Item">
                                <p>Category</p>
                                {PokemonSpecies?.genera[7].genus.replace("Pokémon", "")}
                            </div>
                            <div className="pokemon_item_Info_Item">
                                <p>Types</p>
                                <PokemonListItemContent types={data?.types} />
                            </div>
                            <div className="pokemon_item_Info_Item">
                                <p>Abilities</p>

                                {data?.abilities && data.abilities[0]?.ability?.name}
                            </div>
                            {/* <div className="pokemon_stars">
                <p>Stars</p>
            </div> */}
                        </div>
                        <div style={{    marginTop: '32px'}}>
                            <h2 style={{ color: "#397f84" }}>Stats</h2>
                            <PokemonStats stats={data.stats} />
                        </div>
                    </div>
                </div>
                {evolutionChainItems && <PokemonItemEvolutinoChain />}
            </div>
        </div>
    );
};

export default PokemonItemInfo;
