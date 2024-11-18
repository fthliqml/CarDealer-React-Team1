const initialState = {
  isSubmitting: false,
  submitError: null,
  submitSuccess: false,
  form: {
    name: "",
    email: "",
    password: "",
  },
  errors: {
    name: "",
    email: "",
    password: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: "",
        },
        submitError: null,
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message,
        },
      };
    case "SUBMIT_START":
      return {
        ...state,
        isSubmitting: true,
      };
    case "SUBMIT_FINISH":
      return {
        ...state,
        isSubmitting: false,
      };
    case "SUBMIT_SUCCESS":
      return { ...initialState, submitSuccess: true };

    case "SUBMIT_FAILED":
      return {
        ...state,
        isSubmitting: false,
        submitError: {
          error: action.message,
        },
      };
  }
};

export { initialState, reducer };
