import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import FoodBox from "../../components/FoodBox/FoodBox";
import { FaSearch } from "react-icons/fa";
const SearchResult = () => {
  const [foods, setFoods] = useState([]);
  const { searchValue } = useParams();
  const [searchVal, setSearchValue] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/home/")
      .then((res) => res.json())
      .then((data) => {
        const filteredFoods = data.food.filter((food) =>
          food.name.includes(searchValue)
        );
        setFoods(filteredFoods);
      });
  }, [searchValue]);
  return (
    <>
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            name: `نتیجه جستجو برای کوئری ${searchValue}`,
            title: "جستجو کردن",
            to: `search-result/${searchValue}`,
          },
        ]}
      />
      <div className="tw-mb-60 tw-mt-24 tw-flex tw-justify-center" dir="rtl">
        {foods.length ? (
          <div className="tw-w-9/12 sm:tw-w-full">
            <h2 className="tw-text-4xl tw-mb-8 sm:tw-mr-20">
              نتایج جستجو برای:{" "}
              <span className="tw-text-yellow-500">{searchValue}</span>
            </h2>
            <div
              dir="ltr"
              className="tw-px-3 tw-flex tw-flex-wrap tw-justify-center sm:tw-justify-around lg:tw-justify-start tw-gap-2 lg:tw-gap-0"
            >
              {foods.map((food) => (
                <FoodBox
                  {...food}
                  key={food.id}
                  className="tw-w-11/12 sm:tw-w-5/12 md:tw-w-4/12 lg:tw-w-4/12 xl:tw-w-3/12 tw-mb-10"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="tw-text-center tw-w-10/12 sm:tw-w-8/12 md:tw-w-6/12 lg:tw-w-5/12 xl:tw-w-4/12 2xl:tw-w-3/12">
            <h3 className="tw-text-3xl tw-mb-5">چیزی پیدا نشد</h3>
            <p className="tw-text-base tw-text-gray-600 tw-mb-5">
              با عرض پوزش، اما هیچ چیز مطابق با جستجوی شما نبود. لطفا با برخی از
              کلمات کلیدی مختلف دوباره امتحان کنید.
            </p>
            <div className="tw-mb-10 tw-relative">
              <input
                type="text"
                className="tw-outline-none tw-border tw-py-3 tw-px-12 tw-rounded-full tw-w-full"
                placeholder="جستجو ..."
                value={searchVal}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <Link
                to={searchVal.length ? `/search-result/${searchVal}` : null}
                onClick={() => setSearchValue("")}
                className="tw-absolute tw-right-2 tw-top-2 tw-cursor-pointer tw-bg-black tw-p-2 tw-rounded-full hover:tw-bg-zinc-700"
              >
                <FaSearch color="white" fontSize={20} />
              </Link>
            </div>
            <Link
              to="/"
              className="tw-px-6 tw-py-3 tw-rounded-full tw-bg-yellow-500 hover:tw-bg-gray-800 tw-cursor-pointer tw-text-white tw-transition tw-duration-300"
            >
              من را به صفحه اصلی ببر
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResult;
