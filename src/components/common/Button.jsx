export default function Button({
  type = "button",
  variant = "primary",
  children,
  className = "",
  ...rest
}) {
  const classes = [
    "btn",
    variant === "secondary" ? "btn-secondary" : "btn-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
