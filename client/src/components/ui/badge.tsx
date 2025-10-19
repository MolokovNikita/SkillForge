import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import styles from './badge.module.css';

import { cn } from "./utils.ts";

const badgeVariants = cva(
    styles.badgeBase,
    {
        variants: {
            variant: {
                default: styles.badgeDefault,
                secondary: styles.badgeSecondary,
                destructive: styles.badgeDestructive,
                outline: styles.badgeOutline,
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

function Badge({
    className,
    variant,
    asChild = false,
    ...props
}: React.ComponentProps<"span"> &
    VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : "span";

    return (
        <Comp
            data-slot="badge"
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    );
}

export { Badge, badgeVariants };
