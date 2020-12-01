import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://rickandmortyapi.com/api/character/";

const useFetchData = (query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataAmount, setDataAmount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await axios(`${baseUrl}${query}`);

        setData(response.data.results);
        setDataAmount(response.data.info.count);
        setIsLoading(false);
      } catch (e) {
        setData([]);
        setError("There is no data to show.");
        setDataAmount(0);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return [data, dataAmount, isLoading, error];
};

export default useFetchData;
