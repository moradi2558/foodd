import React, { useContext } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AuthContext from "../../context/AuthContext";
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import apiRequests from "../../services/configs";
import { toast } from "react-toastify";
const CartBox = ({ food, quantity }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const plusQty = (foodID) => {
    if (localStorage.getItem("user")) {
      apiRequests
        .post(
          `/cart/cart/${foodID}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          }
        )
        .then(() => authContext.getCartUser())
        .catch((err) => {
          if (err.response.status === 401) {
            authContext.logout();
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
      navigate("/login");
    }
  };
  const minusQty = (foodID) => {
    if (localStorage.getItem("user")) {
      apiRequests
        .get(`/cart/remove/${foodID}/`, {
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
      navigate("/login");
    }
  };
  const removeCart = (foodID) => {
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
      navigate("/login");
    }
  };
  const discountedPrice = food.price - (food.price * food.discount) / 100;
  return (
    <tr>
      <td className="tw-flex tw-items-center tw-justify-start tw-mr-24 tw-ml-0 tw-pl-0 tw-w-fit">
        <img
          src={`http://127.0.0.1:8000${food.image}`}
          className="tw-w-20 tw-inline"
          alt="food"
        />
        {food.name}
      </td>
      <td>{discountedPrice.toLocaleString()} تومان</td>
      <td>
        <button
          className="tw-text-yellow-500 tw-text-4xl tw-inline-block"
          onClick={() => plusQty(food.id)}
        >
          +
        </button>
        <p className="tw-text-2xl mt-1 tw-mx-3 tw-inline-block">{quantity}</p>
        {quantity === 1 ? (
          <button
            className="tw-text-red-500 tw-inline-block tw-text-lg"
            onClick={() => minusQty(food.id)}
          >
            <FaTrash />
          </button>
        ) : (
          <button
            className="tw-text-yellow-500 tw-text-4xl tw-inline-block"
            onClick={() => minusQty(food.id)}
          >
            -
          </button>
        )}
      </td>
      <td>{(discountedPrice * quantity).toLocaleString()} تومان</td>
      <td>
        <div className="tw-w-fit" onClick={() => removeCart(food.id)}>
          <IoIosCloseCircleOutline className="hover:tw-text-red-600 tw-cursor-pointer tw-text-2xl tw-transition tw-duration-300" />
        </div>
      </td>
    </tr>
  );
};

export default CartBox;
