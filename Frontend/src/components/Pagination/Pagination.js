import React, { useEffect, useState } from "react";
import "./Pagination.css";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const Pagination = ({ items, itemsCount, pathname, setShownItems }) => {
  const [pagesCount, setPagesCount] = useState(null);
  const { page } = useParams();

  useEffect(() => {
    let endIndex = itemsCount * page;
    let startIndex = endIndex - itemsCount;
    let paginatedItems = items.slice(startIndex, endIndex);
    setShownItems(paginatedItems);
    let pagesNumber = Math.ceil(items.length / itemsCount);
    setPagesCount(pagesNumber);
  }, [page, items]);

  return (
    <div className="tw-flex tw-justify-center tw-mt-5">
      <div className="pagination">
        <ul>
          <li className={`prev ${page == 1 ? "disabled" : ""}`}>
            <Link
              to={`${pathname}/${Number(page) - 1}`}
              className={`${page == 1 ? "tw-pointer-events-none" : ""}`}
            >
              <IoIosArrowBack className="tw-mt-0.5" />
            </Link>
          </li>
          {Array(pagesCount)
            .fill(0)
            .map((item, index) =>
              page == index + 1 ? (
                <li className="active" key={index + 1}>
                  <Link to={`${pathname}/${index + 1}`}>{index + 1}</Link>
                </li>
              ) : (
                <li key={index + 1}>
                  <Link to={`${pathname}/${index + 1}`}>{index + 1}</Link>
                </li>
              )
            )}
          <li className={`next ${page == pagesCount ? "disabled" : ""}`}>
            <Link
              to={`${pathname}/${Number(page) + 1}`}
              className={`${
                page == pagesCount ? "tw-pointer-events-none" : ""
              } `}
            >
              <IoIosArrowForward className="tw-mt-0.5" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
