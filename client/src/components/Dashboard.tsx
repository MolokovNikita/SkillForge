import { Users, BookOpen, Award, TrendingUp, Plus, Eye, FileText } from 'lucide-react';
import { KPICard } from './KPICard.tsx';
import { ProgressChart, TestScoreChart, CompletionChart } from './ProgressChart.tsx';
import { CourseCard } from './CourseCard';
import { EmployeeTable } from './EmployeeTable.tsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import styles from './Dashboard.module.css';

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
        <div className={styles.dashboard}>
            {/* Welcome Banner */}
            <div className={styles.welcomeCard}>
                <div className={styles.welcomeContent}>
                    <div className={styles.welcomeText}>
                        <h1>Welcome back, John! 👋</h1>
                        <p>
                            You have 3 pending course approvals and 12 new employee enrollments to review.
                        </p>
                    </div>
                    <div className={styles.welcomeActions}>
                        <Button variant="secondary" className={styles.welcomeButton}>
                            <Plus className={styles.welcomeButtonIcon} />
                            Create Course
                        </Button>
                        <Button variant="secondary" className={styles.welcomeButton}>
                            <Eye className={styles.welcomeButtonIcon} />
                            View Reports
                        </Button>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className={styles.statsGrid}>
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
            <div className={styles.chartsGrid}>
                <ProgressChart />
                <TestScoreChart />
                <CompletionChart />
            </div>

            {/* Content Row */}
            <div className={styles.contentGrid}>
                {/* Recent Activity */}
                <Card className={styles.statCard}>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.activityList}>
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className={styles.activityItem}>
                                    <div className={styles.activityIcon}>
                                        <span className={styles.activityIconText}>
                                            {activity.user.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div className={styles.activityContent}>
                                        <p className={styles.activityText}>
                                            <span className={styles.activityBold}>{activity.user}</span> {activity.action}{' '}
                                            <span className={styles.activityBold}>{activity.item}</span>
                                        </p>
                                        <p className={styles.activityTime}>{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Deadlines */}
                <Card className={styles.statCard}>
                    <CardHeader>
                        <CardTitle>Upcoming Deadlines</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.deadlineList}>
                            {upcomingDeadlines.map((deadline) => (
                                <div key={deadline.id} className={styles.deadlineItem}>
                                    <div className={styles.deadlineContent}>
                                        <p className={styles.deadlineCourse}>{deadline.course}</p>
                                        <p className={styles.deadlineDate}>{deadline.deadline}</p>
                                    </div>
                                    <div className={styles.deadlineActions}>
                                        <Badge className={`${styles.deadlineBadge} ${deadline.priority === 'high' ? styles.deadlineBadgeHigh :
                                            deadline.priority === 'medium' ? styles.deadlineBadgeMedium : styles.deadlineBadgeLow
                                            }`}>
                                            {deadline.daysLeft} days
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className={styles.statCard}>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.quickActionsGrid}>
                            <Button variant="outline" className={styles.quickActionButton}>
                                <Plus className={styles.quickActionIcon} />
                                <span className={styles.quickActionText}>New Course</span>
                            </Button>
                            <Button variant="outline" className={styles.quickActionButton}>
                                <FileText className={styles.quickActionIcon} />
                                <span className={styles.quickActionText}>Create Test</span>
                            </Button>
                            <Button variant="outline" className={styles.quickActionButton}>
                                <Users className={styles.quickActionIcon} />
                                <span className={styles.quickActionText}>Manage Users</span>
                            </Button>
                            <Button variant="outline" className={styles.quickActionButton}>
                                <TrendingUp className={styles.quickActionIcon} />
                                <span className={styles.quickActionText}>Analytics</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Popular Courses */}
            <div>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Popular Courses</h2>
                    <Button variant="outline" className={styles.sectionButton}>View All Courses</Button>
                </div>
                <div className={styles.coursesGrid}>
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