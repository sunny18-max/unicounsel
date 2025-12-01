import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, Bell, Download } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  category: string;
  deadline: Date;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  description: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Register for IELTS Exam',
    category: 'English Test',
    deadline: new Date('2025-01-15'),
    completed: false,
    priority: 'high',
    description: 'Book IELTS test date and prepare for exam'
  },
  {
    id: '2',
    title: 'Complete University Applications',
    category: 'Applications',
    deadline: new Date('2025-02-28'),
    completed: false,
    priority: 'high',
    description: 'Submit applications to all shortlisted universities'
  },
  {
    id: '3',
    title: 'Gather Financial Documents',
    category: 'Documents',
    deadline: new Date('2025-03-15'),
    completed: false,
    priority: 'medium',
    description: 'Collect bank statements, sponsor letters, and proof of funds'
  },
  {
    id: '4',
    title: 'Apply for Scholarships',
    category: 'Scholarships',
    deadline: new Date('2025-03-30'),
    completed: false,
    priority: 'medium',
    description: 'Submit scholarship applications with required essays'
  },
  {
    id: '5',
    title: 'Schedule Visa Interview',
    category: 'Visa',
    deadline: new Date('2025-05-01'),
    completed: false,
    priority: 'high',
    description: 'Book visa appointment at embassy'
  },
  {
    id: '6',
    title: 'Medical Examination',
    category: 'Health',
    deadline: new Date('2025-05-15'),
    completed: false,
    priority: 'medium',
    description: 'Complete required medical tests and vaccinations'
  },
  {
    id: '7',
    title: 'Book Flight Tickets',
    category: 'Travel',
    deadline: new Date('2025-07-01'),
    completed: false,
    priority: 'low',
    description: 'Purchase flight tickets after visa approval'
  },
  {
    id: '8',
    title: 'Arrange Accommodation',
    category: 'Housing',
    deadline: new Date('2025-07-15'),
    completed: false,
    priority: 'medium',
    description: 'Confirm university housing or find off-campus apartment'
  }
];

export const TimetablePlanner = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const upcomingTasks = tasks.filter(t => !t.completed && new Date(t.deadline) > new Date());
  const completedTasks = tasks.filter(t => t.completed);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-white';
      case 'medium': return 'bg-warning text-background';
      case 'low': return 'bg-glow-blue text-white';
      default: return 'bg-secondary';
    }
  };

  const getDaysUntil = (deadline: Date) => {
    const days = Math.floor((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">AI Timetable Planner</h1>
        <p className="text-body text-muted-foreground">
          Plan your preparation and application timeline
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-heading-3 text-foreground mb-1">{tasks.length}</div>
            <p className="text-body-sm text-muted-foreground">Total Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-heading-3 text-success mb-1">{completedTasks.length}</div>
            <p className="text-body-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-heading-3 text-warning mb-1">{upcomingTasks.length}</div>
            <p className="text-body-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-heading-3 text-destructive mb-1">
              {tasks.filter(t => !t.completed && getDaysUntil(t.deadline) <= 7).length}
            </div>
            <p className="text-body-sm text-muted-foreground">Due This Week</p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Application Timeline</CardTitle>
              <CardDescription>Track all important deadlines</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Bell className="h-4 w-4" />
                Set Reminders
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.sort((a, b) => a.deadline.getTime() - b.deadline.getTime()).map((task) => {
              const daysUntil = getDaysUntil(task.deadline);
              const isOverdue = daysUntil < 0 && !task.completed;
              const isUrgent = daysUntil <= 7 && daysUntil >= 0 && !task.completed;

              return (
                <Card 
                  key={task.id}
                  className={`${
                    task.completed ? 'opacity-60' :
                    isOverdue ? 'border-destructive/50' :
                    isUrgent ? 'border-warning/50' : ''
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <h4 className={`text-body font-medium mb-1 ${
                              task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                            }`}>
                              {task.title}
                            </h4>
                            <p className="text-body-sm text-muted-foreground">{task.description}</p>
                          </div>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-body-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-glow-cyan" />
                            <span className={isOverdue ? 'text-destructive' : 'text-muted-foreground'}>
                              {task.deadline.toLocaleDateString()}
                            </span>
                          </div>
                          {!task.completed && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className={
                                isOverdue ? 'text-destructive' :
                                isUrgent ? 'text-warning' : 'text-muted-foreground'
                              }>
                                {isOverdue 
                                  ? `${Math.abs(daysUntil)} days overdue`
                                  : `${daysUntil} days left`
                                }
                              </span>
                            </div>
                          )}
                          <Badge variant="secondary">{task.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};