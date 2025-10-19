import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
    const { user, role, logout } = useAuth();

    const getRoleDisplayName = (role: string) => {
        return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'root_admin':
                return 'bg-red-500';
            case 'company_admin':
                return 'bg-blue-500';
            case 'employee':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getDashboardContent = () => {
        switch (role) {
            case 'root_admin':
                return (
                    <div className="space-y-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-red-800 mb-4">Root Administrator Dashboard</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium text-gray-900">System Overview</h3>
                                    <p className="text-sm text-gray-600 mt-1">Manage all companies and users</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium text-gray-900">User Management</h3>
                                    <p className="text-sm text-gray-600 mt-1">Create and manage root admins</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium text-gray-900">System Settings</h3>
                                    <p className="text-sm text-gray-600 mt-1">Configure global settings</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'company_admin':
                return (
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-blue-800 mb-4">Company Administrator Dashboard</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium text-gray-900">Employee Management</h3>
                                    <p className="text-sm text-gray-600 mt-1">Manage your company employees</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium text-gray-900">Course Management</h3>
                                    <p className="text-sm text-gray-600 mt-1">Create and manage courses</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium text-gray-900">Reports</h3>
                                    <p className="text-sm text-gray-600 mt-1">View company analytics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'employee':
                return (
                    <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-green-800 mb-4">Employee Dashboard</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium text-gray-900">My Courses</h3>
                                    <p className="text-sm text-gray-600 mt-1">View assigned courses</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium text-gray-900">Progress</h3>
                                    <p className="text-sm text-gray-600 mt-1">Track learning progress</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="font-medium text-gray-900">Certificates</h3>
                                    <p className="text-sm text-gray-600 mt-1">View earned certificates</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Unknown role</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">SkillForge</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${getRoleColor(role || '')}`}></div>
                                <span className="text-sm font-medium text-gray-700">
                                    {getRoleDisplayName(role || '')}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500">
                                {user?.full_name} ({user?.email})
                            </div>
                            <button
                                onClick={logout}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {getDashboardContent()}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
