import { useEffect, useState } from 'react';

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // on programme la mise a jour apres le delai
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // si value change avant la fin du delai, on annule le timer precedent
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;