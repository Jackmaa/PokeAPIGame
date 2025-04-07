// This hook fetches a list of Pokémon names from the PokeAPI when the `shouldLoad` parameter is true.
// It uses the `useEffect` hook to trigger the API call and updates the state with the fetched names.

import { useEffect, useState } from "react";
import axios from "axios";

export default function usePokemonNames(shouldLoad) {
  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    if (!shouldLoad || nameList.length > 0) return;

    const fetchNames = async () => {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        const names = res.data.results.map((p) => p.name);
        setNameList(names);
      } catch (err) {
        console.error("Error fetching Pokémon names:", err);
      }
    };

    fetchNames();
  }, [shouldLoad, nameList]);

  return nameList;
}
