import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View, } from "react-native";
import type { Pokemon } from "@/src/models/Pokemon";

type Props = {
    pokemonName: string;
    setPokemonName: (v: string) => void;

    loading: boolean;
    error: string;
    pokemon: Pokemon | null;

    onSearch: () => void;

    favorites: string[];
    isFavorite: boolean;
    onToggleFavorite: () => void;
    onLoadFavorite: (name:string) => void;
};

export function PokemonView(props: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!props.pokemon) return;

    fadeAnim.setValue(0);
    spinAnim.setValue(0);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    ]) .start();
    }, [props.pokemon]);

    const rotate = spinAnim.interpolate({
      inputRange: [0,1],
      outputRange: ["0deg", "1080deg"],
    });
    

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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
            <>
           <Animated.View style={[styles.resultCard, { opacity: fadeAnim, transform: [{rotate}],},]}>
            <Text style={styles.pokeName}>{props.pokemon.name}</Text>

          <Image source={{ uri: props.pokemon.image}} style={styles.image} resizeMode="contain" />

          <Text style={styles.label}>Types:</Text>
          <Text>{props.pokemon.types.join(", ")}</Text>

          <Text style={styles.label}>Abilities:</Text>
          <Text>{props.pokemon.abilities.join(", ")}</Text>

          <Text style={styles.label}>Moves:</Text>
          <Text>{props.pokemon.moves.join(", ")}</Text>

          <View style={{ marginTop: 10, width: "100%" }}>
            <Button
                title={props.isFavorite ? "Unfavorite" : "Favorite"}
                onPress={props.onToggleFavorite}
                />
          </View>
        </Animated.View>

    <View style={styles.favoritesSection}>
      <Text style={styles.label}>Favorites:</Text>

      {props.favorites.length === 0 ? (
        <Text style={{ opacity: 0.7 }}>No Favorites Yet.</Text>
      ) : (
        <View style={{ width: "100%", gap: 8 }}>
          {props.favorites.map((name) => (
            <Pressable
              key={name}
              onPress={() => props.onLoadFavorite(name)}
              style={styles.favoriteItem}
            >
              <Text style={{ textTransform: "capitalize" }}>
                {name}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  </>
)}
 </ScrollView>
    );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
  favoritesSection: {
    width: "100%",
    marginTop: 10,
    gap: 8,
},
favoriteItem: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 10,
},
});