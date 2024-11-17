import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const InputField = ({ state, onChange, field, placeholder = "", children }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label
        className={state.errors[field] ? "text-red-500" : undefined}
        htmlFor={field}
      >
        {capitalizeFirstLetter(field)}
      </Label>
      <div className="flex items-center gap-1">
        <Input
          id={field}
          name={field}
          type={field}
          placeholder={placeholder}
          autoComplete="off"
          className={`rounded-full placeholder:text-slate-300 ${
            state.errors[field]
              ? "focus-visible:ring-red-500 focus-visible:ring-2 ring-1 ring-offset-2 ring-red-500 text-red-500 placeholder:text-red-200"
              : undefined
          }`}
          value={state.form[field]}
          onChange={onChange}
        />
        {children}
      </div>
      {state.errors[field] ? (
        <p className="text-xs text-red-500">{state.errors[field]}</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputField;
