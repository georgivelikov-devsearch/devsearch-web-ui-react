import React from "react";

import { Link } from "react-router-dom";

function Paging() {
  return (
    <div class="pagination">
      <ul class="container">
        <li>
          <a href="#" class="btn btn--disabled">
            &#10094; Prev
          </a>
        </li>
        <li>
          <Link to="/developers?page=1" className="btn btn--sub">
            01
          </Link>
        </li>
        <li>
          <Link to="/developers?page=2" className="btn">
            02
          </Link>
        </li>
        <li>
          <Link to="/developers?page=3" className="btn">
            03
          </Link>
        </li>
        <li>
          <Link to="/developers?page=4" className="btn">
            04
          </Link>
        </li>
        <li>
          <Link to="/developers?page=5" className="btn">
            05
          </Link>
        </li>
        <li>
          <Link to="/developers?page=6" className="btn">
            06
          </Link>
        </li>
        <li>
          <Link to="/developers?page=7" className="btn">
            07
          </Link>
        </li>
        <li>
          <Link to="/developers?page=8" className="btn">
            08
          </Link>
        </li>
        <li>
          <Link to="/developers?page=9" className="btn">
            09
          </Link>
        </li>
        <li>
          <Link to="/developers?page=10" className="btn">
            10
          </Link>
        </li>
        <li>
          <a href="#" class="btn" className="btn">
            Next &#10095;
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Paging;
