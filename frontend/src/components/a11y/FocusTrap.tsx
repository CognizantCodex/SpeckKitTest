import type { ReactNode } from "react";

interface FocusTrapProps {
  children: ReactNode;
}

export function FocusTrap({ children }: FocusTrapProps) {
  return <div className="focus-scope">{children}</div>;
}
