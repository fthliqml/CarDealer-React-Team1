import { cn } from "@/lib/utils";

const Container = ({ children, className }) => {
  return (
    <div className={cn("min-h-screen min-w-screen", className)}>{children}</div>
  );
};

export default Container;
