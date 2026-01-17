import { ReactNode } from "react";

interface MobileContainerProps {
  children: ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="mx-auto max-w-md w-full h-screen bg-white shadow-2xl relative overflow-hidden">
      {children}
    </div>
  );
}
