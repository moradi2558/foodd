import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import "./Navbar.css";
import { NavLink, useParams, useLocation, Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import MiniCart from "../MiniCart/MiniCart";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";
const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isShowSearchBox, setIsShowSearchBox] = useState(false);
  const [show, setShow] = useState(false);
  const [isshowMiniCart, setIsshowMiniCart] = useState(false);
  const { page, categoryName } = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const authContext = useContext(AuthContext);
  const { pathname } = useLocation();
  const logoutUser = () => {
    Swal.fire({
      icon: "warning",
      title: "آیا از خروج از حساب کاربری مطمئن هستید ؟",
      confirmButtonText: "خروج",
      cancelButtonText: "انصراف",
      showCancelButton: true,
      confirmButtonColor: "rgb(239,68,68)",
      customClass: {
        cancelButton: "order-1",
        confirmButton: "order-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:8000/account/logout/", {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            toast.success("با موفقیت از حساب کاربری خود خارج شدید", {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            authContext.logout();
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
    });
  };

  return (
    <>
      <div
        className="tw-px-10 tw-py-1.5 lg:tw-py-5 tw-bg-zinc-900 lg:tw-bg-white tw-sticky tw-top-0"
        style={{ zIndex: "9000" }}
      >
        <div
          className="tw-w-full tw-justify-between tw-items-center tw-hidden lg:tw-flex"
          style={{ direction: "rtl" }}
        >
          <div>
            <img
              src="/images/logo.png"
              alt="logo"
              className="tw-h-20 tw-w-40"
            />
          </div>
          <div className="tw-flex tw-text-xl">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-item-active tw-mx-1" : "nav-item tw-mx-1"
              }
            >
              خانه
            </NavLink>
            <NavLink
              to={`/foods/${categoryName ? categoryName : "all"}/${
                page ? page : "1"
              }`}
              className={({ isActive }) =>
                isActive ? "nav-item-active tw-mx-1" : "nav-item tw-mx-1"
              }
            >
              محصولات
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "nav-item-active tw-mx-1" : "nav-item tw-mx-1"
              }
            >
              سبد خرید
            </NavLink>
          </div>

          <div className="tw-flex tw-space-x-reverse tw-space-x-2 tw-items-center">
            {authContext.isLoggedIn ? (
              <div>
                <button
                  onClick={logoutUser}
                  className="tw-px-4 tw-py-2 tw-rounded-3xl tw-border tw-border-yellow-500 hover:tw-bg-red-500 tw-cursor-pointer tw-text-sm hover:tw-text-white tw-transition tw-duration-500"
                >
                  خروج از سایت
                </button>
              </div>
            ) : (
              <div
                className="btn-group"
                role="group"
                style={{ direction: "ltr" }}
              >
                <NavLink
                  to="/register"
                  style={{
                    border: "1px solid rgb(227 160 8)",
                    borderLeftWidth: "1px",
                    borderRightWidth: ".1px",
                  }}
                  className={({ isActive }) =>
                    isActive
                      ? "tw-px-4 tw-py-2 tw-rounded-l-3xl tw-bg-yellow-500 tw-cursor-pointer tw-text-sm tw-text-white"
                      : "tw-px-4 tw-py-2 tw-rounded-l-3xl hover:tw-bg-yellow-500 tw-cursor-pointer tw-text-sm hover:tw-text-white tw-transition tw-duration-500"
                  }
                >
                  ثبت نام
                </NavLink>
                <NavLink
                  to="/login"
                  style={{
                    border: "1px solid rgb(227 160 8)",
                    borderRightWidth: "1px",
                    borderLeftWidth: "0px",
                  }}
                  className={({ isActive }) =>
                    isActive
                      ? "tw-px-4 tw-py-2 tw-rounded-r-3xl tw-bg-yellow-500 tw-cursor-pointer tw-text-sm tw-text-white"
                      : "tw-px-4 tw-py-2 tw-rounded-r-3xl hover:tw-bg-yellow-500 tw-cursor-pointer tw-text-sm hover:tw-text-white tw-transition tw-duration-500"
                  }
                >
                  ورود
                </NavLink>
              </div>
            )}
            <div
              className="tw-bg-yellow-500 tw-rounded-full tw-p-2 tw-h-fit tw-cursor-pointer tw-relative"
              onClick={() =>
                pathname === "/order"
                  ? setIsshowMiniCart(false)
                  : setIsshowMiniCart(true)
              }
            >
              <TiShoppingCart color="white" fontSize={20} />
              {authContext.cart.count !== 0 && (
                <div className="tw-bg-white tw-rounded-full tw-absolute tw--left-1 tw--top-2 tw-w-5 tw-h-5 tw-flex tw-justify-center tw-items-end">
                  <span
                    className="tw-text-gray-500"
                    style={{ fontSize: "10px", fontWeight: "900" }}
                  >
                    {authContext.cart.count}
                  </span>
                </div>
              )}
            </div>
            <div>
              {isShowSearchBox ? (
                <div
                  className="tw-bg-yellow-500 tw-rounded-full tw-p-2 tw-h-fit tw-cursor-pointer"
                  onClick={() => setIsShowSearchBox(false)}
                >
                  <IoMdClose color="white" fontSize={20} />
                </div>
              ) : (
                <div
                  className="tw-bg-yellow-500 tw-rounded-full tw-p-2 tw-h-fit tw-cursor-pointer"
                  onClick={() => setIsShowSearchBox(true)}
                >
                  <FaSearch color="white" fontSize={20} />
                </div>
              )}
              {isShowSearchBox && (
                <div
                  className="tw-w-full tw-top-0 tw-left-0 tw-h-lvh tw-absolute"
                  onClick={() => setIsShowSearchBox(false)}
                >
                  <div
                    onClick={(event) => event.stopPropagation()}
                    className="searchBox tw-absolute tw-top-32 tw-left-12 tw-p-5 tw-rounded-xl tw-bg-white tw-shadow-2xl"
                  >
                    <div className="tw-relative">
                      <input
                        type="text"
                        className="tw-outline-none tw-border tw-rounded-2xl tw-py-3 tw-pr-8 tw-pl-12"
                        placeholder="جستجو ..."
                        autoFocus
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                      />
                      <Link
                        to={
                          searchValue.length
                            ? `/search-result/${searchValue}`
                            : null
                        }
                        onClick={() => {
                          setIsShowSearchBox(false);
                          setSearchValue("");
                        }}
                        className="tw-absolute tw-left-4 tw-top-3.5 tw-cursor-pointer"
                      >
                        <FaSearch color="black" fontSize={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="tw-flex lg:tw-hidden tw-justify-between tw-items-center"
          style={{ direction: "rtl" }}
        >
          <RxHamburgerMenu
            color="white"
            fontSize={25}
            cursor="pointer"
            onClick={handleShow}
          />
          <div className="tw-w-full tw-flex tw-justify-center">
            <img src="/images/logo.png" alt="logo" className="tw-h-20" />
          </div>
          {isShowSearchBox ? (
            <IoCloseOutline
              color="white"
              fontSize={25}
              cursor="pointer"
              onClick={() => setIsShowSearchBox(false)}
            />
          ) : (
            <IoSearchOutline
              color="white"
              fontSize={25}
              cursor="pointer"
              onClick={() => setIsShowSearchBox(true)}
            />
          )}

          {isShowSearchBox && (
            <div
              className="tw-w-full tw-top-0 tw-left-0 tw-h-lvh tw-absolute"
              onClick={() => setIsShowSearchBox(false)}
            >
              <div
                onClick={(event) => event.stopPropagation()}
                className="searchBox tw-absolute tw-top-24 tw-left-7 tw-p-5 tw-rounded-xl tw-bg-white tw-shadow-2xl"
              >
                <div className="tw-relative">
                  <input
                    type="text"
                    className="tw-outline-none tw-border tw-rounded-2xl tw-py-3 tw-pr-8 tw-pl-12"
                    placeholder="جستجو ..."
                    autoFocus
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                  />
                  <Link
                    to={
                      searchValue.length
                        ? `/search-result/${searchValue}`
                        : null
                    }
                    onClick={() => {
                      setIsShowSearchBox(false);
                      setSearchValue("");
                    }}
                    className="tw-absolute tw-left-4 tw-top-3.5 tw-cursor-pointer"
                  >
                    <FaSearch color="black" fontSize={20} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Offcanvas
        backdrop={true}
        scroll={true}
        show={show}
        onHide={handleClose}
        placement="end"
        className="tw-bg-zinc-900 tw-text-white lg:tw-hidden"
        style={{ zIndex: "9002" }}
        backdropClassName="OffcanvasBackdrop"
        responsive="xl"
      >
        <Offcanvas.Header>
          <Offcanvas.Title className="tw-flex tw-justify-between tw-w-full tw-pr-3 tw-items-center">
            <IoCloseOutline
              className="tw-text-white tw-opacity-65 hover:tw-opacity-100"
              fontSize={28}
              cursor="pointer"
              onClick={handleClose}
            />
            <img src="/images/logo.png" alt="logo" className="tw-h-20" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="tw-flex tw-flex-col">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-item-active__mobile tw-mx-1 tw-text-end tw-mb-3 tw-py-3 tw-text-2xl"
                : "nav-item__mobile tw-mx-1 tw-text-end tw-mb-3 tw-py-3 tw-text-2xl"
            }
          >
            خانه
          </NavLink>
          <NavLink
            to={`/foods/${categoryName ? categoryName : "all"}/${
              page ? page : "1"
            }`}
            className={({ isActive }) =>
              isActive
                ? "nav-item-active__mobile tw-mx-1 tw-text-end tw-mb-3 tw-py-3 tw-text-2xl"
                : "nav-item__mobile tw-mx-1 tw-text-end tw-mb-3 tw-py-3 tw-text-2xl"
            }
          >
            محصولات
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "nav-item-active__mobile tw-mx-1 tw-mb-3 tw-py-3 tw-text-2xl tw-flex tw-justify-end tw-items-center"
                : "nav-item__mobile tw-mx-1 tw-mb-3 tw-py-3 tw-text-2xl tw-flex tw-justify-end tw-items-center"
            }
          >
            {authContext.cart.count !== 0 && (
              <div className="tw-h-fit tw-font-bold tw-mr-2 tw-text-sm tw-text-zinc-900 tw-pt-1 tw-px-2 tw-bg-white tw-rounded-full">
                <span>{authContext.cart.count}</span>
              </div>
            )}
            سبد خرید
          </NavLink>
          {authContext.isLoggedIn ? (
            <div
              onClick={logoutUser}
              className="nav-item__mobile tw-mx-1 tw-text-end tw-mb-3 tw-py-3 tw-text-2xl tw-cursor-pointer hover:tw-bg-red-500"
            >
              خروج از سایت
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "nav-item-active__mobile tw-mx-1 tw-text-end tw-mb-3 tw-py-3 tw-text-2xl"
                    : "nav-item__mobile tw-mx-1 tw-text-end tw-mb-3 tw-py-3 tw-text-2xl"
                }
              >
                ورود
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "nav-item-active__mobile tw-mx-1 tw-text-end tw-mb-3 tw-py-3 tw-text-2xl"
                    : "nav-item__mobile tw-mx-1 tw-text-end tw-mb-3 tw-py-3 tw-text-2xl"
                }
              >
                ثبت نام
              </NavLink>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      {isshowMiniCart ? (
        <MiniCart setIsshowMiniCart={setIsshowMiniCart} />
      ) : null}
    </>
  );
};

export default Navbar;
