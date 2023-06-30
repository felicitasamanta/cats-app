import { useState } from "react";
import { useQueryParams } from "../../../../common/hooks/useQueryParams";
import classes from "../../../../common/styles/Filters.module.css";
import { useDebounce } from "../../../../common/hooks/useDebounce";

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
    <div className={classes.filter}>
      <input
        className={classes.select_btn}
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
