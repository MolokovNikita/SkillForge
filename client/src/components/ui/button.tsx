import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import styles from './button.module.css';

import { cn } from "./utils.ts";

const buttonVariants = cva(
    styles.buttonBase,
    {
        variants: {
            variant: {
                default: styles.buttonDefault,
                destructive: styles.buttonDestructive,
                outline: styles.buttonOutline,
                secondary: styles.buttonSecondary,
                ghost: styles.buttonGhost,
                link: styles.buttonLink,
            },
            size: {
                default: styles.buttonSizeDefault,
                sm: styles.buttonSizeSm,
                lg: styles.buttonSizeLg,
                icon: styles.buttonSizeIcon,
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
