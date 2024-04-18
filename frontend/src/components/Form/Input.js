import React, { useEffect, useReducer } from "react";
import "./Input.css";
import validator from "../../validators/validator";
import messageValidator from "../../validators/messageValidator";
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.value,
        isValid: validator(action.value, action.validations),
        errorMessage: messageValidator(
          action.id,
          action.value,
          action.validations
        ),
      };
    }
    default: {
      return state;
    }
  }
};

const Input = (props) => {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    errorMessage: "",
  });

  const onChangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validations: props.validations,
      id: props.id,
    });
  };

  useEffect(() => {
    props.onInputHandler(props.id, mainInput.value, mainInput.isValid);
  }, [mainInput.value]);

  const element =
    props.element === "textarea" ? (
      <>
        <textarea
          value={mainInput.value}
          id={props.id}
          type={props.type}
          className={props.className}
          spellCheck="false"
          onChange={onChangeHandler}
          rows={5}
        />
        <p className="tw-h-1 tw-mb-1 tw-pr-2 tw-text-xs tw-text-red-500">
          {mainInput.errorMessage}
        </p>
      </>
    ) : (
      <>
        <input
          dir={props.dir}
          value={mainInput.value}
          id={props.id}
          type={props.type}
          className={props.className}
          spellCheck="false"
          onChange={onChangeHandler}
          onKeyDown={
            props.onKeyDown === false
              ? null
              : (event) => {
                  if (event.key === " ") {
                    event.preventDefault();
                  }
                }
          }
        />
        <p className="tw-h-1 tw-mb-5 tw-pr-2 tw-py-1 tw-text-xs tw-text-red-500">
          {mainInput.errorMessage}
        </p>
      </>
    );
  return <> {element}</>;
};

export default Input;
