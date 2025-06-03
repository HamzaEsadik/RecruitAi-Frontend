import { useState, useCallback } from 'react';
import axios from 'axios';

/**
 * Custom hook for making Axios HTTP requests.
 * Manages data, error, and loading states.
 */
function useAxios(initialConfig = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Sends an HTTP request using Axios.
   * Allows overriding initial configuration.
   */
  const sendRequest = useCallback(
    async (overrideConfig = {}) => {
      setLoading(true);
      setError(null);
      setData(null); 
      try {
        const response = await axios({ ...initialConfig, ...overrideConfig });
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [initialConfig] 
  );

  return { data, error, loading, sendRequest };
}

export default useAxios;