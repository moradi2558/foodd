import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import apiRequests from "../../services/configs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MiniCartBox = ({ food, quantity }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const discountedPrice = food.price - (food.price * food.discount) / 100;
  const removeCartHandler = (foodID) => {
    if (localStorage.getItem("user")) {
      apiRequests
        .delete(`/cart/remove/${foodID}/`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        })
        .then(() => authContext.getCartUser())
        .catch((err) => {
          if (err.response.status === 401) {
            authContext.logout();
            navigate("/login");
          } else {
            toast.error("خطایی رخ داده است", {
              position: "top-right",
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
      navigate("/login");
    }
  };
  return (
    <div
      className="tw-relative mini_cart_box tw-px-5 tw-flex tw-items-center tw-mb-2"
      dir="rtl"
    >
      <div className="tw-ml-2">
        <img
          src={`http://127.0.0.1:8000${food.image}`}
          className="tw-w-24"
          alt="img"
        />
      </div>
      <div>
        <h2 className="tw-font-bold tw-mb-2">{food.name}</h2>
        <div>
          <span className="tw-text-gray-400 tw-ml-2">{quantity}×</span>
          <span className="tw-text-yellow-500">
            {discountedPrice.toLocaleString()} تومان
          </span>
        </div>
      </div>
      <span
        onClick={() => removeCartHandler(food.id)}
        className="tw-text-red-600 tw-absolute tw-top-1.5 tw-right-1.5 tw-text-2xl tw-cursor-pointer"
      >
        ×
      </span>
    </div>
  );
};

export default MiniCartBox;
