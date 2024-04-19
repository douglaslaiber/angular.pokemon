export interface IPokemonDetail {
  abilities: Ability[];
  base_experience: number;
  height: number;
  id: number;
  name: string;
  order: number;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  ability: AbilityDetail;
  is_hidden: boolean;
  slot: number;
}

export interface AbilityDetail {
  name: string;
  url: string;
}

export interface Sprites {
  other: {
    home: {
      front_default: string;
    };
  };
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: StatDetail;
}

export interface StatDetail {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: TypeDetail;
}

export interface TypeDetail {
  name: string;
  url: string;
}
