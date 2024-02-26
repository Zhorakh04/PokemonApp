import React, { useEffect, useState } from "react";
import PokemonStatsColumns from "./PokemonStatsColumns";
import { IPokemonStat } from "../../types/IPokemon";

interface IPokemonStatsProp {
    stats: IPokemonStat[];
}

interface PokemonStats {
    HP: number;
    Attack: number;
    Defence: number;
    "Special Attack": number;
    "Special Defense": number;
    Speed: number;
}

const PokemonStats = ({ stats }: IPokemonStatsProp) => {
    const pokemonStats = {
        HP: calculatePokemonStats(255, stats[0].base_stat),
        Attack: calculatePokemonStats(190, stats[1].base_stat),
        Defence: calculatePokemonStats(230, stats[2].base_stat),
        "Special Attack": calculatePokemonStats(194, stats[3].base_stat),
        "Special Defense": calculatePokemonStats(230, stats[4].base_stat),
        Speed: calculatePokemonStats(180, stats[5].base_stat),
    };

    function calculatePokemonStats(maxValue: number, base_stat: number): number {
        return Math.floor((15 * ((base_stat * 100) / maxValue)) / 100);
    }
    console.log(pokemonStats);

    return (
        <div className="pokemon_stats">
            {(Object.keys(pokemonStats) as Array<keyof PokemonStats>).map(
                (el: keyof PokemonStats) => {
                    return (
                        <div key={el}>
                            <PokemonStatsColumns value={pokemonStats[el]} />
                            <p style={{ textAlign: "center" }}>{el}</p>
                        </div>
                    );
                }
            )}
        </div>
    );
};

export default PokemonStats;
