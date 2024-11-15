import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const FormFooter = () => {
  return (
    <CardFooter className="flex-col gap-2">
      <Button className={"w-full bg-[#5e8979] hover:bg-[#16423C]"}>
        Sign Up
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
