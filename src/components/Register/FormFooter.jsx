import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const FormFooter = ({ state }) => {
  return (
    <CardFooter className="flex-col gap-2">
      <Button
        type="submit"
        className={"w-full bg-[#5e8979] hover:bg-[#16423C]"}
        disabled={
          state.errors.name ||
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
          "Sign Up"
        )}
      </Button>
      <Label className={"text-sm text-slate-500"}>
        Already have an account?{" "}
        {
          <Link to={"/login"} className="text-blue-600 underline font-semibold">
            Login
          </Link>
        }
      </Label>
    </CardFooter>
  );
};

export default FormFooter;
