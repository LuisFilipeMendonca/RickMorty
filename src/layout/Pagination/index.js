import React from "react";

import "./index.css";

const selectStart = (currentPage, paginationQtty, lastPage) => {
  let start = 1;

  if (
    currentPage >= paginationQtty &&
    currentPage <= lastPage - (paginationQtty - 1)
  ) {
    start = currentPage - 1;
  }

  if (currentPage > lastPage - (paginationQtty - 1)) {
    start = lastPage - (paginationQtty - 1);
  }

  return start;
};

const Pagination = ({
  dataAmount,
  currentPage,
  pageChangeHandler,
  dataPerPage,
  paginationQtty,
}) => {
  const lastPage = Math.ceil(dataAmount / dataPerPage);
  // let start = 1;
  let middleQtty = 3;

  const start = selectStart(currentPage, paginationQtty, lastPage);
  const pages = [];

  if (currentPage < paginationQtty) {
    for (let i = 0; i < paginationQtty; i++) {
      pages.push(start + i);
    }
    pages.push(...["...", lastPage]);
  } else if (
    currentPage >= paginationQtty &&
    currentPage <= lastPage - (paginationQtty - 1)
  ) {
    pages.push(...[1, "..."]);
    for (let i = 0; i < middleQtty; i++) {
      pages.push(start + i);
    }
    pages.push(...["...", lastPage]);
  } else {
    pages.push(...[1, "..."]);
    for (let i = 0; i < paginationQtty; i++) {
      pages.push(start + i);
    }
  }

  const btns = pages.map((page) => {
    return isNaN(page) ? (
      <div className="pagination__item pagination__item--empty">&#8230;</div>
    ) : (
      <button
        onClick={() => pageChangeHandler(page)}
        className="pagination__item"
      >
        {page}
      </button>
    );
  });

  return <div className="container-flex-center">{btns}</div>;
};

export default Pagination;
