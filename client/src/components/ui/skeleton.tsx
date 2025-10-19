import { cn } from "./utils.ts";
import styles from './skeleton.module.css';

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="skeleton"
            className={cn(styles.skeleton, className)}
            {...props}
        />
    );
}

export { Skeleton };
