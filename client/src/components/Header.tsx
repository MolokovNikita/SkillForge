import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

export function Header() {
    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
            {/* Search */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search courses, employees, or content..."
                        className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative p-2">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                        3
                    </Badge>
                </Button>

                {/* Company Selector */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                        <span className="text-xs font-medium text-white">TC</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">TechCorp Inc.</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-3">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">Company Administrator</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                    </div>
                </div>
            </div>
        </header>
    );
}