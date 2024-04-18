import React from "react";
import "./CategoryBox.css";
import { Link } from "react-router-dom";
const CategoryBox = ({ image, name, id }) => {
  return (
    <div className="tw-w-12/12 md:tw-w-4/12 lg:tw-w-3/12 category_box tw-mb-16 last:tw-mb-0 md:tw-mb-0">
      <Link
        to={`/foods/${id}/1`}
        className="tw-flex tw-flex-col tw-items-center"
      >
        <img
          src={`http://localhost:8000${image}`}
          alt="category"
          className="tw-h-44 md:tw-mb-5"
        />
        <span className="tw-text-2xl category_name tw-mt-3">{name}</span>
      </Link>
    </div>
  );
};

export default CategoryBox;
