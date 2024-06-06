import {
  requiredValue,
  minValue,
  maxValue,
  emailValue,
  passwordValue,
  repeatPasswordValue,
} from "./rules";

import { testEmail, testPassword } from "./regex";

const messageValidator = (id, inputValue, validations) => {
  const inputID =
    id === "username"
      ? "نام کابری"
      : id === "email"
      ? "آدرس ایمیل"
      : id === "password"
      ? "رمز عبور"
      : id === "repeatPassword"
      ? "تکرار رمز عبور"
      : id === "f_name"
      ? "نام"
      : id === "l_name"
      ? "نام خانوادگی"
      : id === "address"
      ? "آدرس"
      : "نام کاربری یا ایمیل";
  for (const validator of validations) {
    if (validator.value === requiredValue) {
      if (inputValue.length === 0) {
        return `لطفا ${inputID} خود را وارد نمایید`;
      }
    }
    if (validator.value === minValue) {
      if (inputValue.length < validator.min) {
        return `${inputID} شما باید حداقل ${validator.min} کاراکتر باشد`;
      }
    }
    if (validator.value === maxValue) {
      if (inputValue.length > validator.max) {
        return `${inputID} شما باید حداکثر ${validator.max} کاراکتر باشد`;
      }
    }
    if (validator.value === passwordValue) {
      if (!testPassword(inputValue)) {
        return "رمزعبور باید حداقل 8 کاراکتر و حداقل یک حرف و یک عدد باشد";
      }
    }
    if (validator.value === emailValue) {
      if (!testEmail(inputValue)) {
        return "ایمیل نامعتبر می باشد";
      }
    }
    if (validator.value === repeatPasswordValue) {
      if (validator.passwordValue !== inputValue) {
        return "تکرار رمزعبور صحیح نمی باشد";
      }
    }
  }
};

export default messageValidator;
