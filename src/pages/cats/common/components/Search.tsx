import { useState } from "react";
import { useQueryParams } from "../../../../common/hooks/useQueryParams";
import { useDebounce } from "../../../../common/hooks/useDebounce";
import classes from "../styles/Search.module.css";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const { params, setQueryParam, removeQueryParam } = useQueryParams();

  const applySearch = (debouncedValue: string) => {
    if (debouncedValue) {
      setQueryParam("image_id", searchValue);
    } else if (!debouncedValue && params.image_id) {
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
