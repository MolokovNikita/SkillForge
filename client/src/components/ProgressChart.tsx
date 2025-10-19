import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import styles from './ProgressChart.module.css';

const progressData = [
  { month: 'Jan', completed: 45, enrolled: 120 },
  { month: 'Feb', completed: 52, enrolled: 135 },
  { month: 'Mar', completed: 48, enrolled: 128 },
  { month: 'Apr', completed: 61, enrolled: 142 },
  { month: 'May', completed: 55, enrolled: 138 },
  { month: 'Jun', completed: 67, enrolled: 155 },
];

const testScoreData = [
  { subject: 'JavaScript', score: 85 },
  { subject: 'React', score: 92 },
  { subject: 'Node.js', score: 78 },
  { subject: 'Python', score: 88 },
  { subject: 'SQL', score: 82 },
];

const completionData = [
  { name: 'Completed', value: 68, color: '#10B981' },
  { name: 'In Progress', value: 24, color: '#3B82F6' },
  { name: 'Not Started', value: 8, color: '#F59E0B' },
];

export function ProgressChart() {
  return (
    <Card className={styles.chartCard}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>Learning Progress Trends</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <ResponsiveContainer width="100%" height={300} className={styles.chartContainer}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="enrolled"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function TestScoreChart() {
  return (
    <Card className={styles.chartCard}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>Average Test Scores by Subject</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <ResponsiveContainer width="100%" height={300} className={styles.chartContainer}>
          <BarChart data={testScoreData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="subject" stroke="#6B7280" />
            <YAxis stroke="#6B7280" domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function CompletionChart() {
  return (
    <Card className={styles.chartCard}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>Course Completion Status</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <ResponsiveContainer width="100%" height={300} className={styles.chartContainer}>
          <PieChart>
            <Pie
              data={completionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {completionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.legendContainer}>
          {completionData.map((item) => (
            <div key={item.name} className={styles.legendItem}>
              <div
                className={styles.legendDot}
                style={{ backgroundColor: item.color }}
              />
              <span className={styles.legendText}>{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}