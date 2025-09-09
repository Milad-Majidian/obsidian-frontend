import { Input as ShadcnInput } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label? : string ;
    error?: string; 
    required?: boolean;
}

const Input =  React.forwardRef<HTMLInputElement, InputProps>((
    { label, error, required,className,id, name, ...props },
    ref
) => {
    const inputId = id || name;
    return (
        <div className="grid w-full items-start gap-1.5">
          {label && (
          <Label
            htmlFor={inputId}
            className={cn(required && "after:content-['*'] after:text-red-500")}
          >
            {label}
          </Label>
        )}
        <ShadcnInput
          id={inputId}
          name={name}
          ref={ref}
          className={cn(error && "border-destructive","h-10", className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-destructive mt-1">
            {error}
          </p>
        )}
        </div>
    );
});

Input.displayName = "Input";
export { Input };
