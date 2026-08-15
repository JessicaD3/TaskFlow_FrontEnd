import { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
  // au premier rendu on lit le localStorage, sinon on prend la valeur par defaut
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  // a chaque changement de value on met a jour le localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('erreur sauvegarde localStorage', err);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;