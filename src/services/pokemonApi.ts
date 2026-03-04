   export async function fetchPokemonByName(pokemonName: string) {
   const q = pokemonName.trim().toLowerCase();

    if(!q){
        throw new Error("Please enter a Pokemon name.");
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`);
    
    if(!response.ok){
        throw new Error("Pokemon not found. Status: " + response.status);
    }
    const data = await response.json();
    return data;
}