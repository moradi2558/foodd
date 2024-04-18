const { useReducer } = require("react");

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      let isFormValid = true;
      for (const inputID in state.inputs) {
        if (action.id === "password" && inputID == "repeatPassword") {
          if (action.value !== state.inputs["repeatPassword"].value) {
            state.inputs["repeatPassword"].isValid = false;
          } else {
            state.inputs["repeatPassword"].isValid = true;
          }
        }
        if (inputID === action.id) {
          isFormValid = isFormValid && action.isValid;
        } else {
          isFormValid = isFormValid && state.inputs[inputID].isValid;
        }
      }
      return {
        inputs: {
          ...state.inputs,
          [action.id]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isFormValid: isFormValid,
      };
    }
    default: {
      return state;
    }
  }
};

const useForm = (initInputs, initIsFormValid) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initInputs,
    isFormValid: initIsFormValid,
  });

  const onInputHandler = (id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value,
      isValid,
      id,
    });
  };

  return [formState, onInputHandler];
};

export default useForm;
