import * as React from "react";

import { cn } from "./utils.ts";
import styles from './textarea.module.css';

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(styles.textarea, className)}
            {...props}
        />
    );
}

export { Textarea };
