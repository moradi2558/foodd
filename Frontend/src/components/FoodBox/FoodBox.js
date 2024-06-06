import React, { useContext } from "react";
import "./FoodBox.css";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiRequests from "../../services/configs";
const FoodBox = ({ className, price, name, discount, image, desc, id }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const discountedPrice = price - (price * discount) / 100;
  const addToCart = () => {
    if (localStorage.getItem("user")) {
      apiRequests
        .post(
          `/cart/cart/${id}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          }
        )
        .then(() => {
          toast.info(`${name} به سبد خرید اضافه شد`, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          authContext.getCartUser();
        })
        .catch((err) => {
          if (err.response.status === 401) {
            authContext.logout();
            toast.info("برای افزودن محصول به سبدخرید باید وارد سایت بشوید", {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              style: { fontSize: 13 },
            });
            navigate("/login");
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
    } else {
      authContext.logout();
      toast.info("برای افزودن محصول به سبدخرید باید وارد سایت بشوید", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: { fontSize: 13 },
      });
      navigate("/login");
    }
  };
  return (
    <div
      className={`tw-relative food_box tw-flex tw-flex-col tw-items-center tw-p-5 tw-border-yellow-500 lg:tw-border-transparent tw-border-dashed hover:tw-border-yellow-400 tw-rounded-3xl tw-border-2 ${className}`}
      style={{ direction: "rtl" }}
    >
      <img
        className="tw-w-52 tw-h-52"
        src={`http://127.0.0.1:8000${image}`}
        alt="food"
      />
      <span className="tw-text-xl tw-font-bold tw-mb-4">{name}</span>
      <span className="tw-line-clamp-2 tw-text-center">{desc}</span>
      <span className="tw-text-sm tw-mt-3 tw-h-5 tw-flex tw-items-start">
        {discount !== 0 ? (
          <>
            <span className="tw-ml-1 tw-bg-red-600 tw-text-white tw-rounded-full tw-px-2 tw-pt-0.5 tw-text-xs">
              {discount}%
            </span>{" "}
            <span className="tw-line-through tw-text-gray-400">
              {price.toLocaleString()} تومان{" "}
            </span>
          </>
        ) : (
          ""
        )}
      </span>
      <span className="tw-text-2xl tw-mt-3 tw-text-yellow-500">
        {discount !== 0
          ? `${discountedPrice.toLocaleString()} تومان`
          : `${price.toLocaleString()} تومان`}
      </span>
      <button className="addToCart_button xl:tw-hidden" onClick={addToCart}>
        افزودن به سبد خرید
      </button>
    </div>
  );
};

export default FoodBox;
