import { useState } from "react";
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<any | null>(null);

  async function handleSearch() {
    const q = pokemonName.trim().toLowerCase();

    if(!q){
      setPokemon(null)
      setError("Please enter a Pokemon name.");
      return;
    }

    setLoading(true);
    setError("");
    setPokemon(null);

    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`);
      if(!response.ok ){
        setError("Pokemon not found. Status: " + response.status);
        return;
      }
      const data = await response.json();
      setPokemon(data);
    }
    catch(error){
      setError("Error fetching Pokemon data:" + error);
    }
    finally{
      setLoading(false);
    }
  }

  const displayName = pokemon?.name ?? "";
  const image = pokemon?.sprites?.front_default ?? "";
  const types = pokemon?.types.map((t:any) => t?.type?.name).filter(Boolean) ?? [];
  const abilities = pokemon?.abilities?.map((a: any) => a?.ability.name).filter(Boolean) ?? [];
  const moves = pokemon?.moves?.map((m:any) => m?.move?.name).filter(Boolean).slice(0,5) ?? [];


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={pokemonName}
        onChangeText={setPokemonName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={handleSearch} />
      {loading && (
        <View style={{ alignItems: "center", gap: 6}}>
          <ActivityIndicator />
          <Text>Loading...</Text>
          </View>)}
        {!!error && <Text style={styles.error}>{error}</Text>}  
        {pokemon && (
           <View style={styles.resultCard}>
            <Text style={styles.pokeName}>{displayName}</Text>
          {!!image && (<Image source={{ uri: image}} style={styles.image} resizeMode="contain" />)}

          <Text style={styles.label}>Types:</Text>
          <Text>{types.join(", ")}</Text>

          <Text style={styles.label}>Abilities:</Text>
          <Text>{abilities.join(", ")}</Text>

          <Text style={styles.label}>Moves:</Text>
          <Text>{moves.join(", ")}</Text>
          </View>
          )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  error: {
    color: "red",
    fontWeight: "600",
  },
  resultCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: "ddd",
    borderRadius: 12,
    padding: 12,
    gap: 8,
    alignItems: "center",
  },
  pokeName: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  image: {
    width: 140,
    height: 140,
  },
  label: {
    marginTop: 6,
    fontWeight: "700",
  },
});