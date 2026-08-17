import { useCallback, useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        // si l'erreur vient juste de l'annulation, on l'ignore
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();

    // annule la requete si le composant se demonte ou si url change
    return () => controller.abort();
  }, [url, reloadIndex]);

  const refetch = useCallback(() => {
    setReloadIndex((i) => i + 1);
  }, []);

  return { data, loading, error, refetch, setData };
}

export default useFetch;