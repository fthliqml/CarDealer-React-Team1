import { TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { forwardRef } from "react";

const MyAlert = forwardRef(
  (
    {
      title = "Success",
      description = "Successfully doing something",
      className,
      variant,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Alert ref={ref} variant={variant} className={className} {...props}>
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        {children}
      </Alert>
    );
  }
);

MyAlert.displayName = "MyAlert";

export default MyAlert;
