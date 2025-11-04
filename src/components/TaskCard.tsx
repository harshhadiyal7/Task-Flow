import { Task } from '@/types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Clock, User, Flag, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onAccept?: (id: string) => void;
  onComplete?: (id: string) => void;
  onFail?: (id: string) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export const TaskCard = ({ task, onAccept, onComplete, onFail, onDelete, isAdmin }: TaskCardProps) => {
  const statusConfig = {
    new: { label: 'New', icon: AlertCircle, color: 'text-warning' },
    accepted: { label: 'Accepted', icon: CheckCircle, color: 'text-blue-400' },
    completed: { label: 'Completed', icon: CheckCircle, color: 'text-success' },
    failed: { label: 'Failed', icon: XCircle, color: 'text-destructive' },
  };

  const priorityConfig = {
    low: { color: 'bg-blue-500/20 text-blue-400' },
    medium: { color: 'bg-warning/20 text-warning' },
    high: { color: 'bg-destructive/20 text-destructive' },
  };

  const StatusIcon = statusConfig[task.status].icon;

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>
        <span className={cn('px-3 py-1 rounded-full text-xs font-medium', priorityConfig[task.priority].color)}>
          {task.priority}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
        <div className={cn('flex items-center gap-1', statusConfig[task.status].color)}>
          <StatusIcon className="w-4 h-4" />
          <span>{statusConfig[task.status].label}</span>
        </div>
      </div>

      {!isAdmin && task.status === 'new' && (
        <div className="flex gap-2">
          <Button onClick={() => onAccept?.(task.id)} className="flex-1" size="sm">
            Accept Task
          </Button>
          <Button onClick={() => onFail?.(task.id)} variant="outline" size="sm">
            Decline
          </Button>
        </div>
      )}

      {!isAdmin && task.status === 'accepted' && (
        <div className="flex gap-2">
          <Button onClick={() => onComplete?.(task.id)} className="flex-1" size="sm">
            Mark Complete
          </Button>
          <Button onClick={() => onFail?.(task.id)} variant="destructive" size="sm">
            Mark Failed
          </Button>
        </div>
      )}

      {isAdmin && (
        <Button 
          onClick={() => onDelete?.(task.id)} 
          variant="outline" 
          size="sm"
          className="w-full"
        >
          Delete Task
        </Button>
      )}
    </Card>
  );
};
