// Hook to fetch tract list from the API

import { useCallback } from "react";

const useFetchTracts = () => {
  const url = `${import.meta.env.VITE_API_URL}/tracts`;

  const callback = useCallback(async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      return json?.tracts ?? [];
    } catch (error) {
      console.error("Error fetching tract list:", error);
      return [];
    }
  }, []);

  return callback;
};

export default useFetchTracts;
