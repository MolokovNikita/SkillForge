import { useState } from 'react';
import { MoreHorizontal, Search, Filter, Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import styles from './EmployeeTable.module.css';

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  avgScore: number;
  lastActivity: string;
  status: 'Active' | 'Inactive' | 'On Leave';
}

const employees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    department: 'Engineering',
    coursesEnrolled: 8,
    coursesCompleted: 5,
    avgScore: 92,
    lastActivity: '2 hours ago',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@techcorp.com',
    department: 'Marketing',
    coursesEnrolled: 6,
    coursesCompleted: 4,
    avgScore: 88,
    lastActivity: '1 day ago',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.davis@techcorp.com',
    department: 'Sales',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    avgScore: 85,
    lastActivity: '3 days ago',
    status: 'Active'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@techcorp.com',
    department: 'HR',
    coursesEnrolled: 4,
    coursesCompleted: 2,
    avgScore: 79,
    lastActivity: '1 week ago',
    status: 'On Leave'
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@techcorp.com',
    department: 'Finance',
    coursesEnrolled: 7,
    coursesCompleted: 6,
    avgScore: 94,
    lastActivity: '4 hours ago',
    status: 'Active'
  }
];

const statusColors = {
  Active: styles.statusActive,
  Inactive: styles.statusInactive,
  'On Leave': styles.statusOnLeave
};

export function EmployeeTable() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className={styles.employeeTableCard}>
      <CardHeader>
        <div className={styles.headerContent}>
          <CardTitle>Employee Learning Progress</CardTitle>
          <div className={styles.headerActions}>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <Button variant="outline" size="sm" className={styles.filterButton}>
              <Filter className={styles.filterIcon} />
              Filter
            </Button>
            <Button variant="outline" size="sm" className={styles.exportButton}>
              <Download className={styles.exportIcon} />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <div className={styles.tableContainer}>
          <Table className={styles.table}>
            <TableHeader className={styles.tableHeader}>
              <TableRow className={styles.tableRow}>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Avg Score</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className={styles.actionsCell}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => {
                const completionRate = Math.round((employee.coursesCompleted / employee.coursesEnrolled) * 100);

                return (
                  <TableRow key={employee.id} className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                      <div className={styles.employeeInfo}>
                        <div className={styles.employeeName}>{employee.name}</div>
                        <div className={styles.employeeEmail}>{employee.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className={styles.tableCell}>{employee.department}</TableCell>
                    <TableCell className={styles.tableCell}>
                      <span className={styles.coursesInfo}>
                        {employee.coursesCompleted}/{employee.coursesEnrolled}
                      </span>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <div className={styles.progressContainer}>
                        <Progress value={completionRate} className={styles.progressBar} />
                        <span className={styles.progressText}>{completionRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <span className={`${styles.scoreContainer} ${employee.avgScore >= 90 ? styles.scoreHigh :
                        employee.avgScore >= 80 ? styles.scoreMedium :
                          styles.scoreLow
                        }`}>
                        {employee.avgScore}%
                      </span>
                    </TableCell>
                    <TableCell className={`${styles.tableCell} ${styles.lastActivity}`}>
                      {employee.lastActivity}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Badge className={`${styles.statusBadge} ${statusColors[employee.status]}`}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className={styles.actionsCell}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className={styles.actionsButton}>
                            <MoreHorizontal className={styles.actionsIcon} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Assign Course</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}