import { useState } from "react";
import { useQueryParams } from "@/common/hooks/useQueryParams";
import { useDebounce } from "@/common/hooks/useDebounce";
import classes from "../styles/Search.module.css";

const Search = () => {
  const { params, setQueryParam, removeQueryParam } = useQueryParams();
  const [searchValue, setSearchValue] = useState(params.image_id || "");

  const applySearch = (debouncedValue: string) => {
    const value = debouncedValue.trim();

    if (value) {
      setQueryParam("image_id", value);
    } else if (!value && params.image_id) {
      removeQueryParam("image_id");
    }
  };

  useDebounce({ value: searchValue, onChange: applySearch });

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={classes.container}>
      <input
        data-testid="search"
        className={classes.input}
        onChange={onSearchChange}
        placeholder="Search..."
        name="search"
        id="search"
        value={searchValue}
      />
    </div>
  );
};

export { Search };
