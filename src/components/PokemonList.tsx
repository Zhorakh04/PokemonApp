import { FC, memo } from "react";
import PokemItem from "./PokemonListItem";
import {IPokemonReqListItem , IPokemonReqTypedListItem} from '../types/PokemonSliceTypes'

interface IProp {
    paginatedData: IPokemonReqTypedListItem[] | IPokemonReqListItem[] 
}
const PokemonList: FC<IProp> = ({ paginatedData }) => {

    return (
        <div className="listOfPOkimons">
            {paginatedData?.map((el:any) => {
                return el?.pokemon?.name ? (
                    <PokemItem key={el.pokemon.name} name={el.pokemon.name} url={el.pokemon.url} />
                ) : (
                    <PokemItem key={el.name} name={el.name} url={el.url} />
                );
            })}
        </div>
    );
};

export default memo(PokemonList);
