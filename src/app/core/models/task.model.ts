export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  description?: string;
  completed: boolean;
  dueDate: string;
  priority?: string;
  createdAt?: string;
}
