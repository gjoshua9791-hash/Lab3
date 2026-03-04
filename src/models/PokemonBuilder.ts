import type { Pokemon } from "./Pokemon";

export class PokemonBuilder {
    private pokemon: string = "";
    private image: string = "";
    private types: string[] = [];
    private abilities: string[]= [];
    private moves: string[] = [];

    setName(name: string) {
        this.pokemon = name;
        return this;
    }
    setImage(image : string) {
        this.image = image;
        return this;
    }
    setTypes(types: string[]) {
        this.types = types;
        return this;
    }

    setAbilities(abilities: string[]) {
        this.abilities = abilities;
        return this;
    }

    setMoves(moves: string[]) {
        this.moves = moves;
        return this;
    }

    build(): Pokemon {
        if(!this.pokemon) {
            throw new Error("Pokemon name is required.");
        }
        if (!this.image) {
            throw new Error("Pokemon image is required.");
        }
        return {
            name: this.pokemon,
            image: this.image,
            types: this.types,
            abilities: this.abilities,
            moves: this.moves,
        };
    }
}