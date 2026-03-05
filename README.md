# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


## Lab 3 Questions

1) The file acting as my main screen currently is the index.tsx file that's in (tabs).
2) The state here is pokemonName and that is the pokemon's name that is inputted by the user as we can see useState("") meaning it is empty by default and populates when the user enters a pokemons name.
3) When fetch receives a non-200 response it still executes but it checks if response.ok is valid and then it'l throw an error based on the status.
4) We shouldn't always assume JSON has the fields we want because the API can change and have missing fields.
5) App truth right now lives in React's state, so it would be pokemonName, error, loading, and pokemon as these are what are being displayed on the UI.
6) If we forget to set loading=false on failure then it continues loading forever even when the pokemon has been fetched.
7) The difference between rendering a raw JSON and and a shaped object is that the raw JSON can contain data we don't need and a shaped object will come only with what we need from it so it's more optimized to our needs.
8)  The javascript and styles are responsible for the UI and what is respsonible for the logic is the API and handling the data, loading, and errors. 
9) 3 responsibilities currently inside index.tsx are ui rendering, data fetching, and handling laoding, errors, and pokemon. 
10) If i wanted to reuse the Pokemon API logic in another screen I would probably make a new file and and moves that code over and connect that file to index so that it routes to the new file when calling on the Pokemon API.
11) If I wanted to test the API parsing logic I think I could pen up the web developer tools and check the console logs or something similar and see what is being called when I enter a pokemon name.
12) Its a win that service doesn't import React because it makes it resuable and it makes for a simple file that only has one task.
13) It takes an input which is the pokemons name, outputs the pokemons data, and throws errors depending on what the issue is from what it receives. 
14) A builder pattern here buys me an easier and simpler way to parse through the JSON raw data and pick out only the things I need as well as it becomes it's own file so its not all in the index.tsx file.
15) A model is safer than raw API JSON because it compiles everything and and has catches in place for any errors. 
16) The controller now owns the loading and error logic as well as the input validation. It also fetches from the API and contains the states.
17) The controller is better than a view for input validation because the view should only be focused on the UI and what's displayed, not how to handle errors and data.
18) The props that the view needs are pokemonName, setPokemonName, loading, error, pokemon, and onSearch.
19) If the view called the API directly then we'd be mixing the UI logic with the fetching logic again and the it defeats the purpose of the MVC which is supposed to separate all the logic for each component.
20) Favorites should live in the controller and not the view because the view only handles UI logic and the logic to toggle a favorite and store it in a list is handled behind the scenes so this keeps them separate.
21) Derived state for isFavorite means that its created from both pokemon and favorites so it's derived from the two. 
22) Persistence is implemented as a service because it doesn;t contain any UI logic, rather it works behind the scenes to keep track of favorites just like the API works behind the scenes and provides data.
23) The difference between a state and a persisted state is that a state lives in the memory and a persisted state is saved to the storage so it remains even after a refresh/restart.