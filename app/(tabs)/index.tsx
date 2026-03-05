
import { usePokemonController } from "@/src/controllers/usePokemonController";
import { PokemonView } from "@/src/components/PokemonView";

export default function HomeScreen() {
  const c = usePokemonController();


  return (
    <PokemonView
    pokemonName={c.pokemonName}
    setPokemonName={c.setPokemonName}
    loading={c.loading}
    error={c.error}
    pokemon={c.pokemon}
    onSearch={c.search}
    />
  );
}