import { LIMIT } from "@/pages/cats/common/hooks/useCats";
import React from "react";
import classes from "@common/styles/Pagination.module.css";
import { useQueryParams } from "@common/hooks/useQueryParams";

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

  const renderPages = () => {
    const isAtTheStart = currentPage < 4;
    const isInTheMiddle = currentPage >= 4 && currentPage < totalPages - 3;
    let pages;

    if (totalPages < 8) {
      pages = new Array(totalPages).fill("").map((_, i) => i + 1);
    } else if (isAtTheStart) {
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

  if (!totalPages || totalPages < 2) return null;

  return <div className={classes.container}>{renderPages()}</div>;
};

export { Pagination };
