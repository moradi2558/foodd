import React, { useContext } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AuthContext from "../../context/AuthContext";
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const CartBox = ({ food, quantity }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const plusQty = (foodID) => {
    if (localStorage.getItem("user")) {
      fetch(`http://localhost:8000/cart/cart/${foodID}/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      }).then((res) => {
        if (res.ok) {
          authContext.getCartUser();
        }
      });
    } else {
      authContext.logout();
      navigate("/login");
    }
  };
  const minusQty = (foodID) => {
    if (localStorage.getItem("user")) {
      fetch(`http://localhost:8000/cart/remove/${foodID}/`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      }).then((res) => {
        if (res.ok) {
          authContext.getCartUser();
        }
      });
    } else {
      authContext.logout();
      navigate("/login");
    }
  };
  const removeCart = (foodID) => {
    if (localStorage.getItem("user")) {
      fetch(`http://localhost:8000/cart/remove/${foodID}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      }).then((res) => {
        if (res.ok) {
          authContext.getCartUser();
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
