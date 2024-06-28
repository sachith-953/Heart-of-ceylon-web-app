import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthLg = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    // cn() set default styles if className is not provided
    // if className has passed, then they append to default styles

    <div className="bg-white flex justify-center">
    <div
      className={cn(
        " bg-white max-w-screen-lg w-full justify-center",
        className
      )}
    >
      {children}
    </div>
    </div>
  );
};

export default MaxWidthLg;
