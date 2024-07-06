import { useState, useEffect } from "react";

const useDebounce = (val, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(val);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(val);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [val]);

  return debouncedValue;
};

export default useDebounce;
