import React from "react";

import { Link } from "react-router-dom";

function Paging({ totalPages, currentPage }) {
  const pageLimit = 10;
  let pageList = [];

  const buildList = (start, end, selectedPage, list) => {
    for (let index = start; index <= end; index++) {
      let pageNumber = index;
      let pageNumberStr = pageNumber.toString();
      if (pageNumber < 10) {
        pageNumberStr = "0" + pageNumberStr;
      }

      let link = `/developers?page=${pageNumber}&search`;

      let btnClass = "btn";
      if (selectedPage === pageNumber) {
        btnClass = "btn btn--sub";
      }

      let pageLink = (
        <li key={pageNumber}>
          <Link to={link} className={btnClass}>
            {pageNumberStr}
          </Link>
        </li>
      );

      list.push(pageLink);
    }
  };

  if (totalPages <= pageLimit) {
    buildList(1, totalPages, currentPage, pageList);
  } else {
    let startPage = currentPage - Math.round(pageLimit / 2) + 1;
    if (startPage <= 0) {
      startPage = 1;
    }

    let endPage = startPage + pageLimit - 1;
    if (endPage > totalPages) {
      let diff = endPage - totalPages;
      startPage -= diff;
      endPage = totalPages;
    }

    buildList(startPage, endPage, currentPage, pageList);
  }

  return (
    <div class="pagination">
      <ul class="container">
        {/* <li>
          {currentPage == 1 ? (
            <Link to="" className="btn btn--disabled">
              &#10094; &#10094;
            </Link>
          ) : (
            <Link to="/developers?page=1" className="btn">
              &#10094; &#10094;
            </Link>
          )}
        </li> */}
        <li>
          {currentPage === 1 ? (
            <Link to="" className="btn btn--disabled">
              &#10094; Prev
            </Link>
          ) : (
            <Link
              to={`/developers?page=${currentPage - 1}&search`}
              className="btn"
            >
              &#10094; Prev
            </Link>
          )}
        </li>
        {pageList}
        <li>
          {currentPage === totalPages || totalPages === 0 ? (
            <Link to="" className="btn btn--disabled">
              Next &#10095;
            </Link>
          ) : (
            <Link
              to={`/developers?page=${currentPage + 1}&search`}
              className="btn"
            >
              Next &#10095;
            </Link>
          )}
        </li>
        {/* <li>
          {currentPage == totalPages ? (
            <Link to="" className="btn btn--disabled">
              &#10095; &#10095;
            </Link>
          ) : (
            <Link to={`/developers?page=${totalPages}`} className="btn">
              &#10095; &#10095;
            </Link>
          )}
        </li> */}
      </ul>
    </div>
  );
}

export default Paging;
