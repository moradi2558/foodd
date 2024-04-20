import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Login.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/Form/Input";
import {
  requiredValidator,
  minValidator,
  passwordValidator,
} from "../../validators/rules";
import useForm from "../../hooks/useForm";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Loader from "../../components/Loader/Loader";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
const Login = () => {
  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const loginUserHandler = () => {
    setIsShowLoader(true);
    const formData = new FormData();
    formData.append("username", formState.inputs.username.value);
    formData.append("password", formState.inputs.password.value);
    fetch("http://127.0.0.1:8000/account/login/", {
      method: "POST",
      body: formData,
    }).then((res) => {
      setIsShowLoader(false);
      if (res.status === 201) {
        toast.success("با موفقیت وارد شدید", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        res.json().then((result) => {
          fetch("http://127.0.0.1:8000/account/token/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(result),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.access) {
                authContext.login(result.access);
                navigate(-1);
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
        });
      } else {
        res.json().then((result) => {
          toast.error(result, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
      }
    });
  };
  return (
    <>
      {isShowLoader && <Loader />}
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "ورود",
            to: "login",
          },
        ]}
      />
      <div className="login tw-my-20 md:tw-my-44">
        <div className="tw-w-full tw-mx-1 sm:tw-w-9/12 md:tw-w-7/12 lg:tw-w-6/12 xl:tw-w-5/12 2xl:tw-w-4/12 tw-flex tw-flex-col tw-items-center">
          <h3 className="tw-mb-4 tw-mr-1 tw-self-start tw-font-bold">ورود</h3>
          <form
            className="tw-border tw-rounded-lg tw-py-6 tw-px-4 tw-w-full"
            onSubmit={(event) => {
              event.preventDefault();
              loginUserHandler();
            }}
          >
            <div className="tw-mb-4">
              <label className="tw-mb-3" htmlFor="username">
                نام کاربری
              </label>
              <div>
                <Input
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator(), minValidator(8)]}
                  id="username"
                  type="text"
                  className="login_input tw-w-full tw-rounded-3xl tw-py-3 tw-px-4"
                />
              </div>
            </div>
            <div className="tw-mb-4">
              <label className="tw-mb-3" htmlFor="password">
                رمز عبور
              </label>
              <div className="tw-relative">
                <Input
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator(), passwordValidator()]}
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                  className="login_input tw-w-full tw-rounded-3xl tw-py-3 tw-px-4"
                />
                {isShowPassword ? (
                  <FaRegEyeSlash
                    className="tw-absolute tw-right-4 tw-top-3.5 tw-opacity-80 tw-cursor-pointer"
                    fontSize={23}
                    onClick={() => setIsShowPassword(false)}
                    spellCheck="false"
                  />
                ) : (
                  <FaRegEye
                    className="tw-absolute tw-right-4 tw-top-3.5 tw-opacity-80 tw-cursor-pointer"
                    fontSize={23}
                    onClick={() => setIsShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <div className="tw-mb-4 tw-flex tw-justify-between tw-items-center">
              <Link
                to="/register"
                className="tw-text-sky-700 tw-text-sm sm:tw-text-base"
              >
                حساب کاربری جدید می سازم
              </Link>
              <button
                type="submit"
                disabled={!formState.isFormValid}
                className="tw-border tw-border-yellow-500 tw-h-fit tw-px-4 tw-py-2 tw-rounded-3xl tw-bg-yellow-500 tw-cursor-pointer tw-text-xl disabled:tw-bg-yellow-400 disabled:tw-text-white disabled:tw-cursor-auto tw-text-slate-50 hover:tw-text-yellow-500 hover:tw-bg-slate-50 tw-transition tw-duration-500"
              >
                ورود
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
