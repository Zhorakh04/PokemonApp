export interface IPokemon {
  id: number;
  height: number;
  name: string;
  weight: number;
  types: IPokeonType[];
  stats: IPokemonStat[];
  abilities: IPokemonAbility[];
}

export interface IPokeonType {
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface IPokemonAbility {
  ability: {
    name: string;
    url: string;
  };
}

export interface IPokemonEvolvesSpecifies {
    name:string,
    url:string
}
