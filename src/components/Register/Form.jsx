import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";

import FormBackground from "@/components/Register/FormBackground";

const Form = ({ children }) => {
  return (
    <Container className={"flex justify-center items-center"}>
      <Card className="w-1/4 h-1/2 backdrop-blur-sm bg-[#E9EFEC]/70">
        {children}
      </Card>
      <FormBackground />
    </Container>
  );
};

export default Form;
