import axios from "axios";
import { FC, memo } from "react";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../hooks/redux";
import { setPokemonItemData } from "../store/PokemonItemSlice";
import PokemonItemImg from "./PokemonListItem/PokemonItemImg";

interface iProp {
    name: string;
    url: string;
}

const getIdFromUrl = (url: string) => {
    const id = url.split("/");
    return +id[id.length - 2];
};

const PokemonListItem: FC<iProp> = ({ name, url }) => {
    const id = getIdFromUrl(url);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleNavigate = () => {
        // dispatch(setPokemonItemData(url));
        console.log(name)
        navigate("/pokemon/" + name);
    };

    return (
        <li className="pokemon_Item">
            <div onClick={handleNavigate}>
                <PokemonItemImg
                    url={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                    onClick={handleNavigate}
                />
                <p className="pokemon_item_name">{name}</p>
                <p className="pokemon_item_id">
                    #{(id < 10 && `00${id}`) || (id < 100 && `0${id}`) || id}
                </p>
            </div>
        </li>
    );
};

export default memo(PokemonListItem);
