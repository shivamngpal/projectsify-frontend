import { cn } from "../../lib/utils";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required,
  className = "",
  ...rest
}) {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-200">
      {label && <span className="font-semibold text-slate-300">{label}</span>}
      <input
        className={cn(
          "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500",
          "transition focus:border-primary focus:ring-2 focus:ring-primary/40 focus:outline-none",
          className
        )}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...rest}
      />
    </label>
  );
}
