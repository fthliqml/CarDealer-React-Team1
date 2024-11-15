import Form from "@/components/Register/Form";
import InputField from "@/components/Register/InputField";
import {
  AtSymbolIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

function Register() {
  return (
    <Form>
      <InputField name="name" placeholder="Muhammad Fatihul Iqmal">
        <UserIcon className="w-7 text-[#16423C]" />
      </InputField>
      <InputField name="email" placeholder="iqmal.example@mail.com">
        <AtSymbolIcon className="w-7 text-[#16423C]" />
      </InputField>
      <InputField name="password" placeholder="********">
        <LockClosedIcon className="w-7 text-[#16423C]" />
      </InputField>
    </Form>
  );
}

export default Register;
