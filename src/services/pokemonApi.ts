   import { PokemonBuilder } from "@/src/models/PokemonBuilder";
   import type { Pokemon } from "@/src/models/Pokemon";
   
   export async function fetchPokemonByName(pokemonName: string): Promise<Pokemon> {
   const q = pokemonName.trim().toLowerCase();

    if(!q){
        throw new Error("Please enter a Pokemon name.");
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`);
    
    if(!response.ok){
        throw new Error("Pokemon not found. Status: " + response.status);
    }
    const data = await response.json();

    const pokemon = new PokemonBuilder() 
        .setName(data.name)
        .setImage(data.sprites?.front_default ?? "")
        .setTypes(data.types.map((t:any) => t?.type?.name).filter(Boolean) ?? [])
        .setAbilities(data.abilities?.map((a: any) => a?.ability.name).filter(Boolean) ?? [])
        .setMoves(data.moves?.map((m:any) => m?.move?.name).filter(Boolean).slice(0,5) ?? [])
        .build();

    return pokemon;
}