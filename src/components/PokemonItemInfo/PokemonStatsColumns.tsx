import React, { memo } from "react";

interface IPokemonStatColumn {
  value: number;
}

const PokemonStatsColumns = ({ value }: IPokemonStatColumn) => {
  return (
    <div className="statColumns">
      {Array.from({ length: 15 }, () => null).map((el, idx) => {
        return (
          <div
            className={`statColumnItem${15 - value <= idx ? " active" : ""}`}
          ></div>
        );
      })}
    </div>
  );
};

export default memo(PokemonStatsColumns);
