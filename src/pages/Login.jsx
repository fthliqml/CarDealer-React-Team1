import {
  AtSymbolIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useReducer, useRef } from "react";

import InputField from "@/components/Register/InputField";
import Form from "@/components/Register/Form";
import MyAlert from "@/components/ui/myAlert";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";

import { isValidEmail, isValidStrLength } from "@/utils/formInputChecker";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { initialState, reducer } from "@/reducers/registerReducer";

import apiInstance from "@/api/apiInstance";
import { Link, useNavigate } from "react-router-dom";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/AuthContext";

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const alertRef = useRef(null);
  const navigate = useNavigate();

  const { setIsAuthorized } = useUser();

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: "SUBMIT_START" });

    const requiredFields = ["email", "password"];
    let isError;

    requiredFields.forEach((field) => {
      if (!state.form[field]) {
        dispatch({
          type: "SET_ERROR",
          field,
          message: `${capitalizeFirstLetter(field)} is required`,
        });
        isError = true;
      }
    });

    // if there is empty field
    if (isError) return dispatch({ type: "SUBMIT_FINISH" });

    const loginUser = {
      email: state.form["email"],
      password: state.form["password"],
    };

    setTimeout(async () => {
      try {
        const response = await apiInstance.post("/auth/login", loginUser, {
          withCredentials: true,
        });

        const resAPI = response.data;

        console.log("resAPI", resAPI);

        if (resAPI.isSuccess) {
          localStorage.setItem("isAuthenticated", true);
          setIsAuthorized(true);
          dispatch({ type: "SUBMIT_SUCCESS" });
          showAlert();

          setTimeout(() => {
            navigate("/car");
          }, 3000);
        }
        // success
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        if (error.status === 400) {
          dispatch({
            type: "SUBMIT_FAILED",
            message: errorMessage,
          });
          // email already registered
          dispatch({
            type: "SET_ERROR",
            field: "email",
            message: errorMessage,
          });
        } else {
          dispatch({
            type: "SUBMIT_FAILED",
            message: errorMessage,
          });
        }
        showAlert();
        console.log("alert");
      }
    }, 1000);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    //  update field
    dispatch({ type: "SET_FIELD", field: name, value });

    // if value is null
    if (!value)
      return dispatch({
        type: "SET_ERROR",
        field: name,
        message: `${capitalizeFirstLetter(name)} is required`,
      });

    // validate email and password
    switch (name) {
      case "email":
        return isValidEmail(value)
          ? ""
          : dispatch({
              type: "SET_ERROR",
              field: name,
              message: "Email is not valid",
            });

      case "password":
        return isValidStrLength(value, 5, 20)
          ? ""
          : dispatch({
              type: "SET_ERROR",
              field: name,
              message:
                "Password is must be more than 5 characters and less than 20 characters",
            });
    }
  }

  function showAlert() {
    alertRef.current.classList.remove("hidden", "animate-slide-out");
    alertRef.current.classList.add("animation-slide-in");

    setTimeout(hideAlert, 2000);
  }

  function hideAlert() {
    alertRef.current.classList.remove("animation-slide-in");
    alertRef.current.classList.add("animate-slide-out");

    setTimeout(() => {
      alertRef.current.classList.add("hidden");
    }, 650);
  }

  return (
    <Container className={"flex justify-center items-center"}>
      <Form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className={"flex gap-1"}>
            <span>Sign In</span>
            <User className="w-7 text-[#5e8979]" />
          </CardTitle>
          <CardDescription>
            Log in and access your favorite car instantly!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <InputField
              state={state}
              onChange={handleChange}
              field="email"
              placeholder="iqmal.example@mail.com"
            >
              <AtSymbolIcon
                className={`w-7 ${
                  state.errors.email ? "text-red-500" : "text-[#16423C]"
                }`}
              />
            </InputField>
            <InputField
              state={state}
              onChange={handleChange}
              field="password"
              placeholder="********"
            >
              <LockClosedIcon
                className={`w-7 ${
                  state.errors.password ? "text-red-500" : "text-[#16423C]"
                }`}
              />
            </InputField>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className={"w-full bg-[#5e8979] hover:bg-[#16423C]"}
            disabled={
              state.errors.email ||
              state.errors.password ||
              state.isSubmitting ||
              state.submitSuccess
            }
          >
            {state.isSubmitting || state.submitSuccess ? (
              <>
                <img src="tube-spinner.svg" className="w-7" alt="spinner"></img>
                {state.submitSuccess ? "Redirecting..." : "Processing..."}
              </>
            ) : (
              "Login"
            )}
          </Button>
          <Label className={"text-sm text-slate-500"}>
            Don’t have an account?{" "}
            {
              <Link
                to={"/register"}
                className="text-blue-600 underline font-semibold"
              >
                Register now!
              </Link>
            }
          </Label>
        </CardFooter>
      </Form>
      <MyAlert
        ref={alertRef}
        className={`absolute top-12 left-1/2 transform -translate-x-1/2 w-1/3 animate-slide-in ${
          !state.submitError ? "hidden" : undefined
        }`}
        variant={state.submitError ? "destructive" : "success"}
        title={state.submitError ? "Error" : "Success"}
        description={
          state.submitError
            ? state.submitError.error
            : "Successfully logged in!"
        }
      />
    </Container>
  );
};

export default Login;
