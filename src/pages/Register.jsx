import InputField from "@/components/Register/InputField";
import Form from "@/components/Register/Form";
import FormHeader from "@/components/Register/FormHeader";
import FormBody from "@/components/Register/FormBody";
import FormFooter from "@/components/Register/FormFooter";

import {
  AtSymbolIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const Register = () => {
  return (
    <Form>
      <FormHeader />
      <FormBody>
        <InputField field="name" placeholder="Muhammad Fatihul Iqmal">
          <UserIcon className="w-7 text-[#16423C]" />
        </InputField>
        <InputField field="email" placeholder="iqmal.example@mail.com">
          <AtSymbolIcon className="w-7 text-[#16423C]" />
        </InputField>
        <InputField field="password" placeholder="********">
          <LockClosedIcon className="w-7 text-[#16423C]" />
        </InputField>
      </FormBody>
      <FormFooter />
    </Form>
  );
};

export default Register;
