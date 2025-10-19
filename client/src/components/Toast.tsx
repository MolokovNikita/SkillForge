import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

interface ToastProps {
    toast: Toast;
    onRemove: (id: string) => void;
}

const ToastComponent: React.FC<ToastProps> = ({ toast, onRemove }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation
        setTimeout(() => setIsVisible(true), 10);

        // Auto remove
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onRemove(toast.id), 300);
        }, toast.duration || 5000);

        return () => clearTimeout(timer);
    }, [toast.id, toast.duration, onRemove]);

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <CheckCircle className={styles.icon} />;
            case 'error':
                return <XCircle className={styles.icon} />;
            case 'warning':
                return <AlertCircle className={styles.icon} />;
            case 'info':
                return <AlertCircle className={styles.icon} />;
            default:
                return <AlertCircle className={styles.icon} />;
        }
    };

    const getToastClass = () => {
        switch (toast.type) {
            case 'success':
                return styles.toastSuccess;
            case 'error':
                return styles.toastError;
            case 'warning':
                return styles.toastWarning;
            case 'info':
                return styles.toastInfo;
            default:
                return styles.toastInfo;
        }
    };

    return (
        <div
            className={`${styles.toast} ${getToastClass()} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            {getIcon()}
            <div className={styles.content}>
                <p className={styles.title}>
                    {toast.title}
                </p>
                {toast.message && (
                    <p className={styles.message}>
                        {toast.message}
                    </p>
                )}
            </div>
            <button
                className={styles.closeButton}
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => onRemove(toast.id), 300);
                }}
            >
                <X className={styles.closeIcon} />
            </button>
        </div>
    );
};

export default ToastComponent;
