import { useState, useCallback } from 'react';
import axios from 'axios';

function useAxios(config = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(
    async (overrideConfig = {}) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios({ ...config, ...overrideConfig });
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  return { data, error, loading, sendRequest };
}

export default useAxios;