import React from "react";
import "./Categories.css";
import CategoryBox from "../CategoryBox/CategoryBox";
const Categories = ({ categories }) => {
  return (
    <div dir="rtl" className="categories__container tw-flex-col md:tw-flex-row md:tw-justify-between md:tw-px-5 lg:tw-px-36 md:tw-items-center tw-flex-wrap tw-py-20 xl:tw-bottom-10">
      {categories.map((category) => (
        <CategoryBox key={category.id} {...category} />
      ))}
    </div>
  );
};

export default Categories;
