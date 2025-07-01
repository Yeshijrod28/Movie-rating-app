
import React from "react";
import './button.css'
const buttonVariants = {
  variant: {
    default: "btn-default",
    destructive: "btn-destructive",
    outline: "btn-outline",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    link: "btn-link",
  },
  size: {
    default: "btn-size-default",
    sm: "btn-size-sm",
    lg: "btn-size-lg",
    icon: "btn-size-icon",
  }
};

const Button = React.forwardRef(({ 
  className = "", 
  variant = "default", 
  size = "default", 
  asChild = false, 
  ...props 
}, ref) => {
  const Comp = asChild ? "span" : "button";
  
  const classes = [
    "btn",
    buttonVariants.variant[variant] || buttonVariants.variant.default,
    buttonVariants.size[size] || buttonVariants.size.default,
    className
  ].filter(Boolean).join(" ");

  return (
    <Comp
      className={classes}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
