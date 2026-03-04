import { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native";

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
        {pokemon && <Text>Found your Pokemon!</Text>}
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
});