import React from "react";
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, View, } from "react-native";
import type { Pokemon } from "@/src/models/Pokemon";

type Props = {
    pokemonName: string;
    setPokemonName: (v: string) => void;

    loading: boolean;
    error: string;
    pokemon: Pokemon | null;

    onSearch: () => void;

};

export function PokemonView(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={props.pokemonName}
        onChangeText={props.setPokemonName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={props.onSearch} />
      {props.loading && (
        <View style={{ alignItems: "center", gap: 6}}>
          <ActivityIndicator />
          <Text>Loading...</Text>
          </View>)}
        {!!props.error && <Text style={styles.error}>{props.error}</Text>}  
        {props.pokemon && (
           <View style={styles.resultCard}>
            <Text style={styles.pokeName}>{props.pokemon.name}</Text>

          <Image source={{ uri: props.pokemon.image}} style={styles.image} resizeMode="contain" />

          <Text style={styles.label}>Types:</Text>
          <Text>{props.pokemon.types.join(", ")}</Text>

          <Text style={styles.label}>Abilities:</Text>
          <Text>{props.pokemon.abilities.join(", ")}</Text>

          <Text style={styles.label}>Moves:</Text>
          <Text>{props.pokemon.moves.join(", ")}</Text>
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
    borderColor: "#ddd",
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