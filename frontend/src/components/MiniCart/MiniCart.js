import React, { useContext } from "react";
import "./MiniCart.css";
import MiniCartBox from "../MiniCartBox/MiniCartBox";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
const MiniCart = ({ setIsshowMiniCart }) => {
  const authContext = useContext(AuthContext);
  return (
    <div
      className="tw-fixed tw-overflow-auto tw-top-0 tw-w-full tw-h-full tw-hidden lg:tw-block"
      style={{ zIndex: "9896863", backgroundColor: "rgba(0,0,0,.5)" }}
      onClick={() => setIsshowMiniCart(false)}
    >
      <div
        style={{ zIndex: "9896865" }}
        className="tw-bg-white tw-w-fit tw-rounded-xl tw-py-8 tw-px-7 tw-ml-3 tw-mt-3 mini_cart"
        onClick={(event) => event.stopPropagation()}
      >
        {authContext.cart.cart.length ? (
          <>
            {authContext.cart.cart.slice(0, 5).map((food) => (
              <MiniCartBox key={food.food.id} {...food} />
            ))}
            <div className="tw-text-right tw-px-6 tw-mt-4 tw-mb-6">
              <span className="tw-ml-2 tw-text-xl tw-font-bold">مبلغ کل :</span>
              <span className="tw-text-lg tw-text-yellow-500">
                {authContext.cart.totalPrice.toLocaleString()} تومان
              </span>
            </div>
            <div>
              <Link
                to="/cart"
                className="tw-ml-1 tw-border tw-border-yellow-500 tw-px-4 tw-py-2 tw-rounded-3xl hover:tw-bg-yellow-500 tw-cursor-pointer hover:tw-text-white tw-transition tw-duration-300"
              >
                مشاهده سبد خرید
              </Link>
              <Link
                to="/order"
                className="tw-mr-1 tw-border hover:tw-border-yellow-500 tw-px-4 tw-py-2 tw-rounded-3xl tw-bg-yellow-500 hover:tw-bg-white tw-cursor-pointer tw-text-white hover:tw-text-black tw-transition tw-duration-300"
              >
                تسویه حساب
              </Link>
            </div>
          </>
        ) : (
          <p className="tw-px-9">هیچ محصولی در سبد خرید نیست</p>
        )}
      </div>
    </div>
  );
};

export default MiniCart;
