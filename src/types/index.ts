export type UserRole = 'admin' | 'employee';

export type TaskStatus = 'new' | 'accepted' | 'completed' | 'failed';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // employee id
  assignedBy: string; // admin id
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}
