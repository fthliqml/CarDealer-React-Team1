import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const InputField = ({ name = false, placeholder = "", children }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name}>{capitalizeFirstLetter(name)}</Label>
      <div className="flex items-center gap-1">
        <Input
          id={name}
          type={name}
          placeholder={placeholder}
          autoComplete="off"
          className={"rounded-full"}
        />
        {children}
      </div>
    </div>
  );
};

export default InputField;
