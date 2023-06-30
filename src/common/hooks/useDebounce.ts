import { useEffect, useState } from "react";

interface Props<T> {
  value: T;
  delay?: number;
  onChange: (value: T) => void;
}

function useDebounce<T>({ value, delay, onChange }: Props<T>) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  useEffect(() => {
    onChange(value);
  }, [debouncedValue]);
}

export { useDebounce };
