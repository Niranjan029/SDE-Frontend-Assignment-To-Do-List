import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../core/models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class TaskFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  taskId?: string;
  @Input() task?: Task | null;
  @Input() inModal = false;
  @Output() saved = new EventEmitter<Task>();
  @Output() cancelled = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      assignedTo: ['', Validators.required],
      description: [''],
      dueDate: [''],
      completed: [false]
    });

    if (this.task) {
      this.isEdit = !!this.task.id;
      this.taskId = this.task.id;
      this.form.patchValue({
        assignedTo: this.task.assignedTo || '',
        description: this.task.description || '',
        dueDate: this.task.dueDate || '',
        completed: !!this.task.completed
      });
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.taskId = id;
      const task = this.taskService.getById(id);
      if (task) {
        this.form.patchValue(task);
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEdit && this.taskId) {
      const payload = { ...this.form.value } as any;
      if (!payload.title && payload.assignedTo) payload.title = payload.assignedTo;
      const updated = this.taskService.update(this.taskId, payload);
      if (this.inModal && updated) {
        this.saved.emit(updated);
        return;
      }
    } else {
      const payload = { ...this.form.value } as any;
      if (!payload.title && payload.assignedTo) payload.title = payload.assignedTo;
      const created = this.taskService.create(payload);
      if (this.inModal && created) {
        this.saved.emit(created);
        return;
      }
    }

    this.router.navigate(['/tasks']);
  }

  cancel(): void {
    if (this.inModal) {
      this.cancelled.emit();
      return;
    }

    this.router.navigate(['/tasks']);
  }
}
