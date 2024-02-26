import React, { FC } from "react";
import { IPokemonTypes } from "../../types/PokemonListTypes";

interface IPropProkemonTypes {
    types:IPokemonTypes[]
}

const PokemonListItemContent: FC<IPropProkemonTypes> = ({ types }) => {
    return (
        <p className="pokemon_item_content">
            {types?.map((type: any, idx) => (
                <span key={type.type.name} style={{ marginRight: "5px" }}>
                    {type.type.name + (types[idx + 1] ? "," : "")}
                </span>
            ))}
        </p>
    );
};

export default PokemonListItemContent;
