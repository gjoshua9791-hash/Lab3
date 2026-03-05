import { useMemo, useState } from 'react';
import type { Pokemon } from '@/src/models/Pokemon';
import { fetchPokemonByName } from "@/src/services/pokemonApi";
import { loadFavorites, saveFavorites } from "@/src/services/favoritesStorage";
import { useEffect } from 'react';

export function usePokemonController() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [favorites, setFavorites] = useState<string[]>([]);

    const isFavorite = useMemo(() => {
        if (!pokemon) return false;
        return favorites.includes(pokemon.name.toLowerCase());
    }, [pokemon, favorites]);
    

    async function search() {
        const q = pokemonName.trim().toLowerCase();

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

    async function loadFavorite(name: string) {
        const q = name.trim().toLowerCase();
        setPokemonName(q);
        setLoading(true);
        setError("");
        setPokemon(null);

        try{
            const result = await fetchPokemonByName(q);
            setPokemon(result);
        } catch(err: any) {
            setError(err.message || "An Error Occurred.");
        } finally {
            setLoading(false);
        }
    }

        function toggleFavorite() {
            if(!pokemon) return;
            const name= pokemon.name.toLowerCase();

            setFavorites((prev) => {
                if(prev.includes(name)){
                    return prev.filter((n) => n !== name);
                }
                return [...prev, name];
            });
            }

        useEffect(() => {
            async function init() {
                const saved = await loadFavorites();
                setFavorites(saved);
            }
            init();
        }, []);
    
        useEffect(() => {
            async function persist() {
                await saveFavorites(favorites);
            }
            persist();
        }, [favorites]);

    return {
        pokemonName,
        setPokemonName,
        pokemon,
        loading,
        error,
        search,
        favorites,
        isFavorite,
        toggleFavorite,
        loadFavorite,
    };

}