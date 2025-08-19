"use client"

import { Button as ShadcnButton } from "@/components/ui/button";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<typeof ShadcnButton> & {
   appVariant?: "primary" | "secondary";
};

// interface CustomButtonProps extends ButtonProps {
//   isLoading?: boolean;
// }

export const Button = ({children,className, ...props }: ButtonProps) => {
    return (
        <ShadcnButton
            className={cn(
                className
            )}
            {...props}
        >
            {children}
        </ShadcnButton>
    );
}
