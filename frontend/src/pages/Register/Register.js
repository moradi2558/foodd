import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Form/Input";
import {
  emailValidator,
  minValidator,
  passwordValidator,
  repeatPasswordValidator,
  requiredValidator,
} from "../../validators/rules";
import useForm from "../../hooks/useForm";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
const Register = () => {
  const authContext = useContext(AuthContext);
  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      repeatPassword: {
        value: "",
        isValid: false,
        errorMessage: "",
      },
    },
    false
  );
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRepeatPassword, setIsShowRepeatPassword] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const navigate = useNavigate();
  const registerHandler = () => {
    setIsShowLoader(true);
    const formData = new FormData();
    formData.append("username", formState.inputs.username.value);
    formData.append("email", formState.inputs.email.value);
    formData.append("password", formState.inputs.password.value);
    formData.append("password2", formState.inputs.repeatPassword.value);
    fetch("http://localhost:8000/account/register/", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        setIsShowLoader(false);
        if (res.ok) {
          toast.success("با موفقیت ثبت نام کردید", {
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
        return res.json();
      })
      .then((result) => {
        if (result.email && result.username) {
          toast.error("کاربری با این ایمیل و نام کاربری وجود دارد", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (result.email) {
          toast.error("کاربری با این ایمیل وجود دارد", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (result.username) {
          toast.error("کاربری با این نام کاربری وجود دارد", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (result.user) {
          fetch("http://localhost:8000/account/token/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: result.user.username,
              password: result.user.password,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              authContext.login(data.access);
              navigate(-1);
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
          { id: 2, title: "ثبت نام", to: "register" },
        ]}
      />
      <div className="login tw-my-20 md:tw-my-32">
        <div className="tw-w-full tw-mx-1 sm:tw-w-9/12 md:tw-w-7/12 lg:tw-w-6/12 xl:tw-w-5/12 2xl:tw-w-4/12 tw-flex tw-flex-col tw-items-center">
          <h3 className="tw-mb-4 tw-mr-1 tw-self-start tw-font-bold">
            ثبت نام
          </h3>
          <form
            className="tw-border tw-rounded-lg tw-py-6 tw-px-4 tw-w-full"
            onSubmit={(event) => {
              event.preventDefault();
              registerHandler();
            }}
          >
            <div className="tw-mb-4">
              <label className="tw-mb-3" htmlFor="username">
                نام کاربری
              </label>
              <div>
                <Input
                  validations={[requiredValidator(), minValidator(8)]}
                  id="username"
                  type="text"
                  className="login_input tw-w-full tw-rounded-3xl tw-py-3 tw-px-4"
                  onInputHandler={onInputHandler}
                />
              </div>
            </div>
            <div className="tw-mb-4">
              <label className="tw-mb-3" htmlFor="email">
                آدرس ایمیل
              </label>
              <div>
                <Input
                  validations={[requiredValidator(), emailValidator()]}
                  id="email"
                  type="text"
                  className="login_input tw-w-full tw-rounded-3xl tw-py-3 tw-px-4"
                  onInputHandler={onInputHandler}
                />
              </div>
            </div>
            <div className="tw-mb-4">
              <label className="tw-mb-3" htmlFor="password">
                رمز عبور
              </label>
              <div className="tw-relative">
                <Input
                  validations={[requiredValidator(), passwordValidator()]}
                  onInputHandler={onInputHandler}
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                  className="login_input tw-w-full tw-rounded-3xl tw-py-3 tw-px-4"
                />
                {isShowPassword ? (
                  <FaRegEyeSlash
                    className="tw-absolute tw-right-4 tw-top-3.5 tw-opacity-80 tw-cursor-pointer"
                    fontSize={23}
                    onClick={() => setIsShowPassword(false)}
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
            <div className="tw-mb-4">
              <label className="tw-mb-3" htmlFor="repeatPassword">
                تکرار رمز عبور
              </label>
              <div className="tw-relative">
                <Input
                  validations={[
                    repeatPasswordValidator(formState.inputs.password.value),
                  ]}
                  onInputHandler={onInputHandler}
                  id="repeatPassword"
                  type={isShowRepeatPassword ? "text" : "password"}
                  className="login_input tw-w-full tw-rounded-3xl tw-py-3 tw-px-4"
                />
                {isShowRepeatPassword ? (
                  <FaRegEyeSlash
                    className="tw-absolute tw-right-4 tw-top-3.5 tw-opacity-80 tw-cursor-pointer"
                    fontSize={23}
                    onClick={() => setIsShowRepeatPassword(false)}
                  />
                ) : (
                  <FaRegEye
                    className="tw-absolute tw-right-4 tw-top-3.5 tw-opacity-80 tw-cursor-pointer"
                    fontSize={23}
                    onClick={() => setIsShowRepeatPassword(true)}
                  />
                )}
              </div>
            </div>
            <div className="tw-mb-4 tw-flex tw-justify-between tw-items-center">
              <Link
                className="tw-text-sky-700 tw-text-sm sm:tw-text-base"
                to="/login"
              >
                قبلاً در فود مود حساب کاربری داشتم
              </Link>

              <button
                type="submit"
                disabled={!formState.isFormValid}
                className="tw-border tw-border-yellow-500 tw-h-fit tw-px-4 tw-py-2 tw-rounded-3xl tw-bg-yellow-500 tw-cursor-pointer disabled:tw-cursor-auto tw-text-xl tw-text-slate-50 hover:tw-text-yellow-500 hover:tw-bg-slate-50 tw-transition tw-duration-300 disabled:tw-bg-yellow-400 disabled:tw-text-white"
              >
                ثبت نام
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
