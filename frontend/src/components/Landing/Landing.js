import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Landing.css";
const Landing = () => {
  return (
    <>
      <div
        className="tw-relative tw-flex tw-w-full tw-overflow-hidden landing-container xl:tw-h-dvh"
        style={{ direction: "rtl" }}
      >
        <div>
          <div className="tw-absolute tw--right-28  md:tw--right-48 xl:tw--right-28 2xl:tw-right-0">
            <img
              src="/images/pizza_slider.png"
              className="tw-w-1/2 md:tw-w-4/5 xl:tw-w-full"
              alt="pizza_slider"
              style={{ userSelect: "none" }}
            />
          </div>
          <div className="tw-absolute slider-item tw--left-56 tw-top-72 tw-hidden xl:tw-block">
            <img src="/images/cutlery.png" alt="cutlery" />
          </div>
          <div className="tw-absolute slider-item tw--right-12 tw-bottom-20 tw-hidden 2xl:tw-block">
            <img src="/images/tomato_slider.png" alt="tomato_slider" />
          </div>
          <div className="tw-absolute slider-item xl:tw-top-24 xl:tw-right-1/3 leaf_slider">
            <img
              src="/images/leaf_slider.png"
              className="tw-w-16 xl:tw-w-48"
              alt="leaf_slider"
            />
          </div>
          <div className="tw-absolute slider-item xl:tw-top-12 xl:tw-left-1/4 mushroom_slider">
            <img
              src="/images/mushroom_slider.png"
              className="tw-w-5 xl:tw-w-20"
              alt="mushroom_slider"
            />
          </div>
          <div className="tw-absolute tw-z-50 slider-item xl:tw-right-1/3 2xl:tw-right-1/2 xl:tw-bottom-6 pepper_slider">
            <img
              src="/images/pepper_slider.png"
              className="tw-w-6 xl:tw-w-32"
              alt="pepper_slider"
            />
          </div>
        </div>
        <div className="tw-w-6/12 md:tw-w-7/12 lg:tw-w-5/12 xl:tw-w-6/12"></div>

        <div className="tw-w-8/12 md:tw-w-6/12 xl:tw-w-5/12 tw-flex tw-flex-col tw-items-end sm:tw-items-center tw-mt-7 sm:tw-mt-24 md:tw-mt-40 tw-z-50">
          <div className="tw-w-10/12 md:tw-w-full">
            <div className="pizza_time tw-py-1 tw-text-white tw-my-2 tw-w-9/12 sm:tw-w-6/12 md:tw-w-4/12">
              <span className="lg:tw-text-xl">پیتزا تایم</span>
            </div>
            <h2 className="tw-text-2xl sm:tw-text-5xl lg:tw-text-7xl tw-font-extrabold">
              یکی بخر دوتا ببر
            </h2>
          </div>
          <p className="tw-text-justify tw-pl-4 sm:tw-pl-16 tw-mt-3 lg:tw-text-lg">
            با توجه به شدت گرمای فرآیند خشک کردن ، این شرکت با استفاده از روش
            بازسازی سیستم تامین گرما اقدام به اجرای آن کرد
          </p>
          <div className="tw-flex tw-items-center tw-justify-between tw-w-full tw-px-1 sm:tw-justify-around md:tw-justify-end md:tw-ml-32 md:tw-mt-8">
            <div className="tw-flex tw-items-center tw-text-sm sm:tw-text-lg md:tw-text-2xl md:tw-ml-14">
              <BsTwitterX className="tw-text-gray-600/80 hover:tw-text-yellow-500 tw-cursor-pointer tw-ml-2 lg:tw-ml-4 tw-transition tw-duration-300" />
              <FaTelegramPlane className="tw-text-gray-600/80 hover:tw-text-yellow-500 tw-cursor-pointer tw-ml-2 lg:tw-ml-4 tw-transition tw-duration-300" />
              <FaFacebookF className="tw-text-gray-600/80 hover:tw-text-yellow-500 tw-cursor-pointer tw-ml-2 lg:tw-ml-4 tw-transition tw-duration-300" />
              <FaLinkedinIn className="tw-text-gray-600/80 hover:tw-text-yellow-500 tw-cursor-pointer tw-ml-2 lg:tw-ml-4 tw-transition tw-duration-300" />
            </div>
            <Link
              to="/foods/all/1"
              className="tw-border tw-border-yellow-500 tw-px-4 tw-py-2 tw-rounded-3xl hover:tw-bg-yellow-500 tw-cursor-pointer tw-text-sm hover:tw-text-white lg:tw-text-xl tw-transition tw-duration-500"
            >
              سفارش
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
