import { useEffect } from "react";
import { cn } from "../../lib/utils";

export function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    if (open) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange?.(false);
      }}
    >
      {children}
    </div>
  );
}

export function DialogContent({ className = "", children }) {
  return (
    <div className={cn("modal", className)} role="dialog" aria-modal="true">
      {children}
    </div>
  );
}

export function DialogHeader({ className = "", children }) {
  return <div className={cn("modal__header", className)}>{children}</div>;
}

export function DialogTitle({ className = "", children }) {
  return <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>;
}
