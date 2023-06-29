import { useEffect, useState } from "react";

type DebounceProps = {
  value: string;
  miliSeconds: number;
};

const useDebounce: React.FC<DebounceProps> = ({ value, miliSeconds }) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, miliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, miliSeconds]);

  return debouncedValue;
};
export { useDebounce };
