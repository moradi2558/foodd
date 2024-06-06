import { testEmail, testPassword } from "./regex";
import {
  requiredValue,
  minValue,
  maxValue,
  emailValue,
  passwordValue,
  repeatPasswordValue,
} from "./rules";

const validator = (inputValue, validations) => {
  let validationsResult = [];
  for (const validator of validations) {
    if (validator.value === requiredValue) {
      inputValue.trim().length === 0 && validationsResult.push(false);
    }
    if (validator.value === minValue) {
      inputValue.trim().length < validator.min && validationsResult.push(false);
    }
    if (validator.value === maxValue) {
      inputValue.trim().length > validator.max && validationsResult.push(false);
    }
    if (validator.value === emailValue) {
      !testEmail(inputValue) && validationsResult.push(false);
    }
    if (validator.value === passwordValue) {
      !testPassword(inputValue) && validationsResult.push(false);
    }
    if (validator.value === repeatPasswordValue) {
      if (inputValue !== validator.passwordValue) {
         validationsResult.push(false)
      }
    }
  }

  if (validationsResult.length) {
    return false;
  } else {
    return true;
  }
};

export default validator;
