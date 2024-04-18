import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./Cart.css";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import CartBox from "../../components/CartBox/CartBox";
import AuthContext from "../../context/AuthContext";
import { FaCircleInfo } from "react-icons/fa6";
const Cart = () => {
  const authContext = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title: "سبد خرید", to: "cart" },
        ]}
      />
      {authContext.cart.cart.length ? (
        <div
          className="tw-mt-28 tw-mb-44 tw-flex tw-flex-col md:tw-flex-row tw-items-center md:tw-items-start tw-justify-evenly"
          dir="rtl"
        >
          <div className="tw-w-11/12 md:tw-w-7/12 xl:tw-w-fit tw-overflow-x-auto tw-shadow-xl tw-rounded-2xl">
            <table className="cart_table tw--mr-20">
              <thead>
                <tr>
                  <th className="tw-w-96">محصول</th>
                  <th>هزینه</th>
                  <th>تعداد</th>
                  <th>مجموع</th>
                </tr>
              </thead>
              <tbody>
                {authContext.cart.cart.map((food) => (
                  <CartBox key={food.food.id} {...food} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="tw-sticky tw-top-36 tw-w-11/12 md:tw-w-4/12 xl:tw-w-3/12 tw-mt-6 md:tw-mt-0 tw-bg-white tw-shadow-2xl tw-rounded-md tw-p-4 tw-text-sm">
            <div className="tw-flex tw-items-center tw-border-b tw-pb-3 tw-mb-5">
              <IoFastFoodOutline className="tw-text-yellow-500 tw-text-4xl" />
              <p className="tw-pr-2 tw-text-md tw-font-bold">سبد خرید</p>
            </div>
            <div className="tw-flex tw-flex-col">
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-5">
                <p className="tw-text-gray-500">تعداد سفارش</p>
                <p>{authContext.cart.count} عدد</p>
              </div>
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-5">
                <p className="tw-text-gray-500">مبلغ کل</p>
                <p>{authContext.cart.totalPrice.toLocaleString()} تومان</p>
              </div>
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-16">
                <p className="tw-text-gray-500">مبلغ قابل پرداخت</p>
                <p>{authContext.cart.totalPrice.toLocaleString()} تومان</p>
              </div>
              <Link
                to="/order"
                className="tw-bg-yellow-500 tw-w-full tw-py-2 tw-rounded-lg tw-text-md tw-text-white tw-text-center"
              >
                ادامه
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="tw-flex tw-justify-center tw-mt-28 tw-mb-96" dir="rtl">
          <div className="tw-w-11/12 md:tw-w-10/12 lg:tw-w-9/12">
            <p className="tw-border-t-2 tw-border-blue-500 tw-pt-4 tw-pr-4 tw-flex tw-items-center tw-mb-20">
              <FaCircleInfo className="tw-ml-2 tw-text-blue-600 tw-text-xl" />{" "}
              سبد خرید شما در حال حاضر خالی است
            </p>
            <Link
              to="/foods/all/1"
              className="tw-text-xl tw-border hover:tw-border-yellow-500 tw-px-6 tw-py-4 tw-rounded-full tw-bg-yellow-500 hover:tw-bg-white tw-cursor-pointer tw-text-white hover:tw-text-black tw-transition tw-duration-500"
            >
              بازگشت به فروشگاه
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Cart;
