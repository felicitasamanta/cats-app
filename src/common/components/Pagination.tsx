import { LIMIT } from "../../pages/cats/common/hooks/useCats";
import { useQueryParams } from "../hooks/useQueryParams";
import classes from "../styles/Pagination.module.css";
import React from "react";

interface Props {
  total: number;
}

const Pagination: React.FC<Props> = ({ total }) => {
  const { params, setQueryParam } = useQueryParams();
  const currentPage = params.page ? parseInt(params.page) : 0;
  const totalPages = Math.ceil(total / LIMIT);

  const onChange = (page: number | string) => {
    if (typeof page === "number") {
      setQueryParam("page", page);
    }
  };

  const getPages = () => {
    const isAtTheStart = currentPage < 4;
    const isInTheMiddle = currentPage >= 4 && currentPage < totalPages - 3;
    let pages;

    if (isAtTheStart) {
      pages = [1, 2, 3, 4, 5, "...", totalPages];
    } else if (isInTheMiddle) {
      pages = [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    } else
      [
        (pages = [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ]),
      ];

    return pages.map((page, i) => (
      <span key={i} onClick={() => onChange(page)}>
        {page}
      </span>
    ));
  };

  return <div className={classes.container}>{getPages()}</div>;
};

export { Pagination };