// Hook to fetch tract detail from the API

import { useCallback } from "react";

const useFetchTractDetail = () => {
  const callback = useCallback(async (fid: number) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/tracts/${fid}`;
      const response = await fetch(url);
      const json = await response.json();

      return json;
    } catch (error) {
      console.error("Error fetching tract detail:", error);
      return {};
    }
  }, []);

  return callback;
};

export default useFetchTractDetail;
