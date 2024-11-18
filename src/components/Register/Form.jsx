import { Card } from "@/components/ui/card";

import FormBackground from "@/components/Register/FormBackground";

const Form = ({ children, ...props }) => {
  return (
    <>
      <Card className="backdrop-blur-sm bg-[#E9EFEC]/70">
        <form {...props}>{children}</form>
      </Card>
      <FormBackground />
    </>
  );
};

export default Form;
