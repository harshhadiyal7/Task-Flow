import { useAuth } from '@/contexts/AuthContext';
import { useTasks } from '@/contexts/TaskContext';
import { Sidebar } from '@/components/Sidebar';
import { TaskCard } from '@/components/TaskCard';
import { ClipboardList, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { getTasksByEmployee, updateTask } = useTasks();
  const myTasks = getTasksByEmployee(user!.id);

  const handleAccept = (id: string) => {
    updateTask(id, { status: 'accepted' });
    toast.success('Task accepted!');
  };

  const handleComplete = (id: string) => {
    updateTask(id, { status: 'completed' });
    toast.success('Task marked as completed!');
  };

  const handleFail = (id: string) => {
    updateTask(id, { status: 'failed' });
    toast.error('Task marked as failed');
  };

  const tasksByStatus = {
    new: myTasks.filter(t => t.status === 'new'),
    accepted: myTasks.filter(t => t.status === 'accepted'),
    completed: myTasks.filter(t => t.status === 'completed'),
    failed: myTasks.filter(t => t.status === 'failed'),
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Employee Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">New Tasks</p>
                  <p className="text-3xl font-bold text-warning">{tasksByStatus.new.length}</p>
                </div>
                <AlertCircle className="w-10 h-10 text-warning opacity-50" />
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Accepted</p>
                  <p className="text-3xl font-bold text-blue-400">{tasksByStatus.accepted.length}</p>
                </div>
                <Clock className="w-10 h-10 text-blue-400 opacity-50" />
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Completed</p>
                  <p className="text-3xl font-bold text-success">{tasksByStatus.completed.length}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-success opacity-50" />
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Failed</p>
                  <p className="text-3xl font-bold text-destructive">{tasksByStatus.failed.length}</p>
                </div>
                <XCircle className="w-10 h-10 text-destructive opacity-50" />
              </div>
            </div>
          </div>

          <Tabs defaultValue="new" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="new">New ({tasksByStatus.new.length})</TabsTrigger>
              <TabsTrigger value="accepted">Accepted ({tasksByStatus.accepted.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({tasksByStatus.completed.length})</TabsTrigger>
              <TabsTrigger value="failed">Failed ({tasksByStatus.failed.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="new">
              {tasksByStatus.new.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No new tasks assigned to you</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tasksByStatus.new.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onAccept={handleAccept}
                      onFail={handleFail}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="accepted">
              {tasksByStatus.accepted.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No accepted tasks in progress</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tasksByStatus.accepted.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onComplete={handleComplete}
                      onFail={handleFail}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed">
              {tasksByStatus.completed.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No completed tasks yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tasksByStatus.completed.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="failed">
              {tasksByStatus.failed.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <XCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No failed tasks</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tasksByStatus.failed.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
