export interface IFetchPokemonResponse {
  results: IPokemon[];
}

export interface IPokemon {
  name: string;
  url: string;
  favorite: boolean;
  comment: IPokemonComment | null;
}

export interface IPokemonComment {
  author: string;
  comment: string;
}
