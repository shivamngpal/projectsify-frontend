import { cn } from "../../lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
const variants = {
  default:
    "bg-gradient-to-r from-[#5b7cfa] to-[#22d3ee] text-white shadow-[0_10px_30px_rgba(91,124,250,0.35)] hover:brightness-105",
  secondary:
    "border border-white/15 bg-white/5 text-white hover:border-white/30",
};

export function Button({
  className = "",
  variant = "default",
  asChild,
  ...props
}) {
  const Component = asChild ? "span" : "button";
  return (
    <Component
      className={cn(base, variants[variant] || variants.default, className)}
      {...props}
    />
  );
}
