import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import styles from './KPICard.module.css';

interface KPICardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    icon: LucideIcon;
    color: 'blue' | 'green' | 'orange' | 'purple';
}

const colorClasses = {
    blue: {
        bg: styles.blue,
        icon: styles.blueIcon,
        change: styles.blueChange
    },
    green: {
        bg: styles.green,
        icon: styles.greenIcon,
        change: styles.greenChange
    },
    orange: {
        bg: styles.orange,
        icon: styles.orangeIcon,
        change: styles.orangeChange
    },
    purple: {
        bg: styles.purple,
        icon: styles.purpleIcon,
        change: styles.purpleChange
    }
};

export function KPICard({ title, value, change, changeType, icon: Icon, color }: KPICardProps) {
    const classes = colorClasses[color];

    return (
        <Card className={styles.kpiCard}>
            <CardContent className={styles.cardContent}>
                <div className={styles.contentContainer}>
                    <div className={styles.contentLeft}>
                        <p className={styles.title}>{title}</p>
                        <p className={styles.value}>{value}</p>
                        {change && (
                            <p className={`${styles.change} ${changeType === 'positive' ? styles.changePositive :
                                    changeType === 'negative' ? styles.changeNegative :
                                        styles.changeNeutral
                                }`}>
                                {change}
                            </p>
                        )}
                    </div>
                    <div className={`${styles.iconContainer} ${classes.icon}`}>
                        <Icon className={styles.icon} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}