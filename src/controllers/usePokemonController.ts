import { useState } from 'react';
import type { Pokemon } from '@/src/models/Pokemon';
import { fetchPokemonByName } from "@/src/services/pokemonApi";

export function usePokemonController() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function search() {
        const q = pokemonName.trim();

        if (!q) {
            setError("Please enter a Pokemon name.");
            return;
        }

        setLoading(true);
        setError("");
        setPokemon(null);

        try {
            const result = await fetchPokemonByName(q);
            setPokemon(result);
        } catch (err: any) {
            setError(err.message || "An Error Occurred.");
        } finally {
            setLoading(false);
        }
    }

    return {
        pokemonName,
        setPokemonName,
        pokemon,
        loading,
        error,
        search,
    };

}