import { Component, OnInit } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, FormsModule],
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchQuery = '';

  showModal = false;
  modalTask: Task | null = null;
  showDeleteModal = false;
  deleteTaskCandidate: Task | null = null;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getAll();
    this.filteredTasks = [...this.tasks];

    const svcAny: any = this.taskService as any;
    if (svcAny.tasks$ && typeof svcAny.tasks$.subscribe === 'function') {
      svcAny.tasks$.subscribe((updated: Task[]) => {
        this.tasks = updated;
        this.applySearch();
      });
    }
  }

  addNew(): void {
    if (this.router && typeof this.router.navigate === 'function') {
      this.router.navigate(['/tasks/create']);
    }
    this.modalTask = null;
    this.showModal = true;
  }

  edit(task: Task): void {
    if (this.router && typeof this.router.navigate === 'function') {
      this.router.navigate(['/tasks/edit', task.id]);
    }
    this.modalTask = { ...task };
    this.showModal = true;
  }

  deleteTask(task: Task): void {
    const svcAny: any = this.taskService as any;
    if (!svcAny.tasks$ && typeof svcAny.delete === 'function') {
      svcAny.delete(task.id);
      return;
    }
    this.deleteTaskCandidate = task;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.deleteTaskCandidate = null;
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    if (!this.deleteTaskCandidate) return;
    this.taskService.delete(this.deleteTaskCandidate.id);
    this.deleteTaskCandidate = null;
    this.showDeleteModal = false;
  }

  refreshList(): void {
    this.loadTasks();
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.applySearch();
  }

  applySearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredTasks = [...this.tasks];
    } else {
      const q = this.searchQuery.toLowerCase();
      this.filteredTasks = this.tasks.filter(t =>
        (t.title || '').toLowerCase().includes(q) ||
        (t.assignedTo || '').toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q)
      );
    }
  }

  onSaved(_: Task): void {
    this.showModal = false;
    this.modalTask = null;
  }

  onCancelled(): void {
    this.showModal = false;
    this.modalTask = null;
  }
}
