"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils.ts";
import styles from './toggle.module.css';

const toggleVariants = cva(
    styles.toggleBase,
    {
        variants: {
            variant: {
                default: styles.toggleDefault,
                outline: styles.toggleOutline,
            },
            size: {
                default: styles.toggleSizeDefault,
                sm: styles.toggleSizeSm,
                lg: styles.toggleSizeLg,
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Toggle({
    className,
    variant,
    size,
    ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>) {
    return (
        <TogglePrimitive.Root
            data-slot="toggle"
            className={cn(toggleVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Toggle, toggleVariants };
