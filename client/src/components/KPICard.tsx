import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './ui/card';

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
        bg: 'bg-blue-50',
        icon: 'bg-blue-100 text-blue-600',
        change: 'text-blue-600'
    },
    green: {
        bg: 'bg-green-50',
        icon: 'bg-green-100 text-green-600',
        change: 'text-green-600'
    },
    orange: {
        bg: 'bg-orange-50',
        icon: 'bg-orange-100 text-orange-600',
        change: 'text-orange-600'
    },
    purple: {
        bg: 'bg-purple-50',
        icon: 'bg-purple-100 text-purple-600',
        change: 'text-purple-600'
    }
};

export function KPICard({ title, value, change, changeType, icon: Icon, color }: KPICardProps) {
    const classes = colorClasses[color];

    return (
        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                        <p className="text-2xl font-semibold text-gray-900 mb-2">{value}</p>
                        {change && (
                            <p className={`text-sm ${changeType === 'positive' ? 'text-green-600' :
                                changeType === 'negative' ? 'text-red-600' :
                                    'text-gray-600'
                                }`}>
                                {change}
                            </p>
                        )}
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${classes.icon} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}