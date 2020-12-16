import React, { useRef, useState } from "react";
import axios from "axios";

const baseUrl = "https://rickandmortyapi.com/api/character/";

const useRequest = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestHandler = async (query, requestConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios(`${baseUrl}${query}`);

      setData(response.data);
    } catch (e) {
      setData(null);
      setError("There is no data to show.");
    }

    setIsLoading(false);
  };

  return [data, isLoading, error, requestHandler];
};

export default useRequest;
