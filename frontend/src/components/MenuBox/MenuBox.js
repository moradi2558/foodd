import React from "react";
import "./MenuBox.css"
const MenuBox = () => {
  return (
    <div className="tw-w-11/12 sm:tw-w-9/12 md:tw-w-8/12 lg:tw-w-9/12 tw-h-20 tw-flex tw-items-center tw-justify-center tw-my-3">
      <div className="tw-w-3/12 sm:tw-w-2/12 lg:tw-w-3/12 2xl:tw-w-2/12">
        <img
          src="/images/burger-1.avif"
          className="menu_item_img tw-rounded-full tw-w-20 tw-h-20"
          alt=""
        />
      </div>
      <div className="tw-w-9/12 lg:tw-w-9/12 2xl:tw-w-10/12 sm:tw-mr-2 md:tw-mr-0">
        <div className="tw-flex tw-justify-between menu-item_content tw-items-center">
          <span className="md:tw-text-2xl tw-ml-2 tw-text-white">ماشروم برگر</span>
          <span className="tw-font-semibold md:tw-text-2xl tw-order-3 tw-mr-2">
            85,000 تومان
          </span>
        </div>
        <span className="tw-text-white tw-opacity-70">اکنون در فود مود موجود است</span>
      </div>
    </div>
  );
};

export default MenuBox;
