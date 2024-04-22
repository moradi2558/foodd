import React from "react";
import FoodBox from "../FoodBox/FoodBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const LastFoods = ({ foods }) => {
  return (
    <>
      <p className="tw-text-yellow-500 tw-text-md tw-font-extrabold tw-text-center tw-mb-3 tw-mt-5">
        همیشه باکیفیت
      </p>
      <h2 className="tw-text-2xl lg:tw-text-4xl tw-font-bold tw-text-center">
        {" "}
        ... آخرین غذاهای اضافه شده
      </h2>
      <div className="tw-flex tw-justify-center">
        <div className="tw-w-5/6">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {foods.map((food) => (
              <SwiperSlide className="tw-py-20" key={food.id}>
                <FoodBox {...food} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default LastFoods;
