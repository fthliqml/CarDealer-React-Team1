import { UserPlusIcon } from "@heroicons/react/24/solid";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FormHeader = () => {
  return (
    <CardHeader>
      <CardTitle className={"flex gap-1"}>
        <span>Sign Up</span>
        <UserPlusIcon className="w-7 text-[#5e8979]" />
      </CardTitle>
      <CardDescription>
        Register as member and choose your favorite car instantly !
      </CardDescription>
    </CardHeader>
  );
};

export default FormHeader;
