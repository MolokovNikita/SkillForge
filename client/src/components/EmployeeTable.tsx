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
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-gray-100 text-gray-800',
  'On Leave': 'bg-yellow-100 text-yellow-800'
};

export function EmployeeTable() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Employee Learning Progress</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Avg Score</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => {
                const completionRate = Math.round((employee.coursesCompleted / employee.coursesEnrolled) * 100);
                
                return (
                  <TableRow key={employee.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {employee.coursesCompleted}/{employee.coursesEnrolled}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="w-20">
                        <Progress value={completionRate} className="h-2" />
                        <span className="text-xs text-gray-500 mt-1">{completionRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${
                        employee.avgScore >= 90 ? 'text-green-600' :
                        employee.avgScore >= 80 ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>
                        {employee.avgScore}%
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {employee.lastActivity}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[employee.status]}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
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