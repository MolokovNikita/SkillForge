import { Users, BookOpen, Award, TrendingUp, Plus, Eye, FileText } from 'lucide-react';
import { KPICard } from './KPICard.tsx';
import { ProgressChart, TestScoreChart, CompletionChart } from './ProgressChart.tsx';
import { CourseCard } from './CourseCard';
import { EmployeeTable } from './EmployeeTable.tsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const recentCourses = [
    {
        id: '1',
        title: 'Advanced React Development',
        description: 'Deep dive into React hooks, context, and performance optimization techniques for modern web applications.',
        image: 'https://images.unsplash.com/photo-1673515335586-f9f662c01482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHR0ZWNobm9sb2d5JTIwY291cnNlJTIwb25saW5lJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzU5NjU3MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        duration: '6 weeks',
        enrolled: 45,
        rating: 4.8,
        progress: 0,
        difficulty: 'Advanced' as const,
        category: 'Development'
    },
    {
        id: '2',
        title: 'Corporate Leadership Fundamentals',
        description: 'Essential leadership skills for managers and team leads in corporate environments.',
        image: 'https://images.unsplash.com/photo-1758691736067-b309ee3ef7b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMG1lZXRpbmd8ZW58MXx8fHwxNzU5NjU3MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        duration: '4 weeks',
        enrolled: 32,
        rating: 4.6,
        progress: 0,
        difficulty: 'Intermediate' as const,
        category: 'Leadership'
    },
    {
        id: '3',
        title: 'Data Analytics with Python',
        description: 'Learn data analysis, visualization, and machine learning using Python and popular libraries.',
        image: 'https://images.unsplash.com/photo-1758691736821-f1a600c0c3f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGxlYXJuaW5nJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1OTY1NzE3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        duration: '8 weeks',
        enrolled: 28,
        rating: 4.9,
        progress: 0,
        difficulty: 'Beginner' as const,
        category: 'Data Science'
    }
];

const recentActivity = [
    { id: 1, user: 'Sarah Johnson', action: 'completed', item: 'JavaScript Fundamentals', time: '2 hours ago' },
    { id: 2, user: 'Michael Chen', action: 'enrolled in', item: 'React Advanced Patterns', time: '4 hours ago' },
    { id: 3, user: 'Emily Davis', action: 'scored 95% on', item: 'CSS Grid Assessment', time: '6 hours ago' },
    { id: 4, user: 'David Wilson', action: 'started', item: 'Project Management Basics', time: '1 day ago' },
    { id: 5, user: 'Lisa Anderson', action: 'completed', item: 'SQL Database Design', time: '1 day ago' }
];

const upcomingDeadlines = [
    { id: 1, course: 'Security Compliance Training', deadline: 'Dec 15, 2024', daysLeft: 3, priority: 'high' },
    { id: 2, course: 'Annual Ethics Review', deadline: 'Dec 20, 2024', daysLeft: 8, priority: 'medium' },
    { id: 3, course: 'Q4 Performance Assessment', deadline: 'Dec 31, 2024', daysLeft: 19, priority: 'low' }
];

export function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold mb-2">Welcome back, John! 👋</h1>
                        <p className="text-blue-100">
                            You have 3 pending course approvals and 12 new employee enrollments to review.
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <Button variant="secondary" className="bg-white/20 text-white border-white/20 hover:bg-white/30">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Course
                        </Button>
                        <Button variant="secondary" className="bg-white/20 text-white border-white/20 hover:bg-white/30">
                            <Eye className="w-4 h-4 mr-2" />
                            View Reports
                        </Button>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Total Employees"
                    value="1,247"
                    change="+12% from last month"
                    changeType="positive"
                    icon={Users}
                    color="blue"
                />
                <KPICard
                    title="Active Courses"
                    value="68"
                    change="+3 new this week"
                    changeType="positive"
                    icon={BookOpen}
                    color="green"
                />
                <KPICard
                    title="Completion Rate"
                    value="84%"
                    change="+5% from last month"
                    changeType="positive"
                    icon={Award}
                    color="purple"
                />
                <KPICard
                    title="Avg Test Score"
                    value="87%"
                    change="+2% from last month"
                    changeType="positive"
                    icon={TrendingUp}
                    color="orange"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <ProgressChart />
                <TestScoreChart />
                <CompletionChart />
            </div>

            {/* Content Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-medium text-blue-600">
                                            {activity.user.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900">
                                            <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                                            <span className="font-medium">{activity.item}</span>
                                        </p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Deadlines */}
                <Card className="border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle>Upcoming Deadlines</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingDeadlines.map((deadline) => (
                                <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{deadline.course}</p>
                                        <p className="text-xs text-gray-500">{deadline.deadline}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant={
                                            deadline.priority === 'high' ? 'destructive' :
                                                deadline.priority === 'medium' ? 'default' : 'secondary'
                                        }>
                                            {deadline.daysLeft} days
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
                                <Plus className="w-5 h-5" />
                                <span className="text-xs">New Course</span>
                            </Button>
                            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
                                <FileText className="w-5 h-5" />
                                <span className="text-xs">Create Test</span>
                            </Button>
                            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
                                <Users className="w-5 h-5" />
                                <span className="text-xs">Manage Users</span>
                            </Button>
                            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
                                <TrendingUp className="w-5 h-5" />
                                <span className="text-xs">Analytics</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Popular Courses */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Popular Courses</h2>
                    <Button variant="outline">View All Courses</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentCourses.map((course) => (
                        <CourseCard key={course.id} {...course} />
                    ))}
                </div>
            </div>

            {/* Employee Progress Table */}
            <EmployeeTable />
        </div>
    );
}