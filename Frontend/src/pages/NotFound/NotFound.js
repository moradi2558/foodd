import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const NotFound = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title: "صفحه خطا", name: "ارور 404", to: "*" },
        ]}
      />
      <div className="tw-mb-60 tw-mt-24 tw-flex tw-justify-center" dir="rtl">
        <div className="tw-flex tw-flex-col tw-items-center tw-w-11/12 md:tw-w-9/12 lg:tw-w-7/12 xl:tw-w-6/12 2xl:tw-w-5/12">
          <div className="tw-mb-12">
            <img src="/images/404.png" alt="" />
          </div>
          <h3 className="tw-text-3xl sm:tw-text-5xl tw-mb-5 tw-text-center">
            متاسفم این صفحه پیدا نشد!
          </h3>
          <p className="tw-text-base tw-text-gray-600 tw-mb-5 tw-w-10/12 sm:tw-w-8/12 tw-text-center">
            به نظر ميرسه صفحه مورد نظر شما منتقل شده، حذف شده، تغییر نام داده
            شده یا هرگز وجود نداشته است.
          </p>
          <div className="tw-mb-7 tw-relative tw-w-10/12">
            <input
              type="text"
              className="tw-outline-none tw-border-2 tw-py-3 tw-px-12 tw-rounded-full tw-w-full"
              placeholder="جستجو ..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <Link
              to={searchValue.length ? `/search-result/${searchValue}` : null}
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
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
