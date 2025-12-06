import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  getAll(): Task[] {
    return [...this.tasks];
  }

  getById(id: string): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  create(task: Partial<Task>): Task {
    const newTask: Task = {
      id: uuidv4(),
      title: task.title || (task.assignedTo || ''),
      assignedTo: task.assignedTo || '',
      description: task.description || '',
      completed: task.completed || false,
      dueDate: task.dueDate || '',
      createdAt: new Date().toISOString()
    };

    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);

    return newTask;
  }

  update(id: string, updated: Partial<Task>): Task | undefined {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return undefined;
    const merged = { ...this.tasks[index], ...updated } as Task;
    if ((!updated.title || updated.title === '') && updated.assignedTo) {
      merged.title = updated.assignedTo;
      merged.assignedTo = updated.assignedTo;
    }

    this.tasks[index] = merged;
    this.tasksSubject.next([...this.tasks]);

    return this.tasks[index];
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next([...this.tasks]);
  }
}
