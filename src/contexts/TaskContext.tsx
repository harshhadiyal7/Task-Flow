import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, User } from '@/types';

interface TaskContextType {
  tasks: Task[];
  employees: User[];
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByEmployee: (employeeId: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    const loadEmployees = () => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const employeeUsers = users.filter((u: User) => u.role === 'employee');
      setEmployees(employeeUsers);
    };

    loadEmployees();
    
    // Listen for storage changes to refresh employees list
    window.addEventListener('storage', loadEmployees);
    
    // Also create a custom event for same-tab updates
    window.addEventListener('usersUpdated', loadEmployees);
    
    return () => {
      window.removeEventListener('storage', loadEmployees);
      window.removeEventListener('usersUpdated', loadEmployees);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getTasksByEmployee = (employeeId: string) => {
    return tasks.filter(task => task.assignedTo === employeeId);
  };

  return (
    <TaskContext.Provider value={{ tasks, employees, createTask, updateTask, deleteTask, getTasksByEmployee }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
