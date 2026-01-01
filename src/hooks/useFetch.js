import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for fetching data with caching
 * Implements stale-while-revalidate pattern
 *
 * @param {string} url - The URL to fetch
 * @param {object} options - Fetch options
 * @param {number} cacheTime - Cache duration in milliseconds (default: 5 minutes)
 */
export const useFetch = (url, options = {}, cacheTime = 5 * 60 * 1000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCacheKey = useCallback(() => {
    return `gleam_cache_${url}_${JSON.stringify(options)}`;
  }, [url, options]);

  const getCachedData = useCallback(() => {
    try {
      const cacheKey = getCacheKey();
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();

        // Return cached data if it's still fresh
        if (now - timestamp < cacheTime) {
          return data;
        }
      }

      return null;
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  }, [getCacheKey, cacheTime]);

  const setCachedData = useCallback((data) => {
    try {
      const cacheKey = getCacheKey();
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error writing cache:', error);
    }
  }, [getCacheKey]);

  const fetchData = useCallback(async (useCache = true) => {
    // Try to get cached data first
    if (useCache) {
      const cachedData = getCachedData();
      if (cachedData) {
        setData(cachedData);
        setLoading(false);

        // Revalidate in the background
        fetchData(false);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setData(result);
      setCachedData(result);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [url, options, getCachedData, setCachedData]);

  const refetch = useCallback(() => {
    return fetchData(false);
  }, [fetchData]);

  const clearCache = useCallback(() => {
    try {
      const cacheKey = getCacheKey();
      localStorage.removeItem(cacheKey);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }, [getCacheKey]);

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache
  };
};

export default useFetch;
