import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./Order.css";
import Input from "../../components/Form/Input";
import useForm from "../../hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../validators/rules";
import AuthContext from "../../context/AuthContext";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Order = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [formState, onInputHandler] = useForm(
    {
      f_name: {
        value: "",
        isValid: false,
      },
      l_name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const orderHandler = (event) => {
    event.preventDefault();
    setIsShowLoader(true);
    if (localStorage.getItem("user")) {
      const formData = new FormData();
      formData.append("f_name", formState.inputs.f_name.value);
      formData.append("l_name", formState.inputs.l_name.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("address", formState.inputs.address.value);
      fetch("http://127.0.0.1:8000/cart/order/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
        body: formData,
      }).then((res) => {
        setIsShowLoader(false);
        if (res.ok) {
          toast.success("سفارش شما با موفقیت ثبت شد", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        } else {
          toast.error("خطایی رخ داده است", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
    }
  };
  return (
    <>
      {isShowLoader && <Loader />}
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title: "تسویه حساب", to: "order" },
        ]}
      />
      <div className="tw-my-40 tw-flex tw-justify-center" dir="rtl">
        <div className="tw-w-11/12 sm:tw-w-9/12 md:tw-w-full lg:tw-w-11/12 xl:tw-w-10/12 2xl:tw-w-8/12 md:tw-flex tw-items-start tw-justify-between">
          <div className="shadow-lg tw-rounded-xl tw-py-8 tw-p-4 tw-mb-6 md:tw-w-5/12 md:tw-mx-2 lg:tw-mx-0">
            <h3 className="tw-text-4xl tw-mb-6">سفارش شما</h3>
            <div className="tw-border-b tw-pb-3 tw-mb-3">
              <div className="tw-flex tw-justify-between tw-text-white tw-bg-zinc-800 tw-mb-4 tw-py-3 tw-px-4 tw-text-xl tw-rounded-3xl">
                <p>محصول</p>
                <p>هزینه</p>
              </div>
              {authContext.cart.cart.map((food) => (
                <div
                  key={food.food.id}
                  className="tw-text-sm tw-flex tw-justify-between tw-px-4 tw-mb-2"
                >
                  <p>
                    <span className="tw-font-bold">{food.food.name}</span>{" "}
                    <span className="tw-text-gray-500">×{food.quantity}</span>
                  </p>
                  <p className="tw-font-bold">
                    {(
                      (food.food.price -
                        (food.food.price * food.food.discount) / 100) *
                      food.quantity
                    ).toLocaleString()}{" "}
                    تومان
                  </p>
                </div>
              ))}
            </div>
            <div className="tw-flex tw-justify-end">
              <div className="tw-w-11/12 tw-pl-5 tw-text-md tw-font-semibold">
                <div className="tw-flex tw-justify-between tw-border-b tw-pb-2 tw-mb-2">
                  <p>مبلغ کل</p>
                  <p className="tw-text-yellow-500">
                    {authContext.cart.totalPrice.toLocaleString()} تومان
                  </p>
                </div>
                <div className="tw-flex tw-justify-between">
                  <p>مبلغ قابل پرداخت</p>
                  <p className="tw-text-yellow-500">
                    {authContext.cart.totalPrice.toLocaleString()} تومان
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-lg tw-rounded-xl tw-py-8 tw-p-4 md:tw-w-6/12 md:tw-mx-2 lg:tw-mx-0">
            <h3 className="tw-text-4xl tw-mb-6">جزئیات صورتحساب</h3>
            <form action="">
              <div className="tw-mb-4">
                <label
                  htmlFor="f_name"
                  className="tw-pr-4 tw-mb-3 tw-font-semibold"
                >
                  نام
                </label>
                <div>
                  <Input
                    validations={[
                      requiredValidator(),
                      minValidator(3),
                      maxValidator(20),
                    ]}
                    onKeyDown={false}
                    onInputHandler={onInputHandler}
                    id="f_name"
                    type="text"
                    className="tw-outline-none tw-border tw-w-full tw-rounded-3xl tw-py-3 tw-px-5"
                  />
                </div>
              </div>
              <div className="tw-mb-4">
                <label
                  htmlFor="l_name"
                  className="tw-pr-4 tw-mb-3 tw-font-semibold"
                >
                  نام خانوادگی
                </label>
                <div>
                  <Input
                    validations={[
                      requiredValidator(),
                      minValidator(3),
                      maxValidator(40),
                    ]}
                    onKeyDown={false}
                    onInputHandler={onInputHandler}
                    id="l_name"
                    type="text"
                    className="tw-outline-none tw-border tw-w-full tw-rounded-3xl tw-py-3 tw-px-5"
                  />
                </div>
              </div>
              <div className="tw-mb-4">
                <label
                  htmlFor="email"
                  className="tw-pr-4 tw-mb-3 tw-font-semibold"
                >
                  ایمیل
                </label>
                <div>
                  <Input
                    dir="ltr"
                    validations={[requiredValidator(), emailValidator()]}
                    onInputHandler={onInputHandler}
                    id="email"
                    type="text"
                    className="tw-outline-none tw-border tw-w-full tw-rounded-3xl tw-py-3 tw-px-5"
                  />
                </div>
              </div>
              <div className="tw-mb-4">
                <label
                  htmlFor="address"
                  className="tw-pr-4 tw-mb-3 tw-font-semibold"
                >
                  آدرس
                </label>
                <div>
                  <Input
                    validations={[requiredValidator(), minValidator(10)]}
                    onInputHandler={onInputHandler}
                    element="textarea"
                    id="address"
                    className="tw-outline-none tw-border tw-w-full tw-rounded-3xl tw-py-3 tw-px-5"
                  />
                </div>
              </div>
              <div className="tw-flex tw-justify-end">
                <button
                  disabled={!formState.isFormValid}
                  onClick={orderHandler}
                  className="tw-ml-1 tw-border hover:tw-border-yellow-500 tw-px-4 tw-py-2 tw-rounded-3xl disabled:tw-bg-yellow-400 tw-bg-yellow-500 hover:tw-bg-white disabled:tw-cursor-default tw-cursor-pointer tw-text-white disabled:tw-text-white hover:tw-text-black tw-transition tw-duration-300"
                >
                  ثبت سفارش
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;
