import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "pokemon:favorites:v1";

export async function loadFavorites(): Promise<string[]> {
    try {
        const raw = await AsyncStorage.getItem(KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);

        if (Array.isArray(parsed)) {
            return parsed;
        }
        return [];
    } catch{
        return [];
    }
}
    export async function saveFavorites(favorites: string[]): Promise<void> {
        try { 
            await AsyncStorage.setItem(KEY, JSON.stringify(favorites));
        }
        catch{
            // Handle error if needed
        }
    }
