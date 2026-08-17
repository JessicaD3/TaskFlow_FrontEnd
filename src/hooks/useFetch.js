import { useCallback, useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
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

        // renvoi le total de tâche
        const count = response.headers.get('X-Total-Count');
        if (count) setTotalCount(Number(count));

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

  return { data, loading, error, refetch, setData, totalCount };
}

export default useFetch;