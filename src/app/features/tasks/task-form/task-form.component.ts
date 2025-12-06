import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
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
    const nonNull = (c: AbstractControl) => (c.value === null || c.value === undefined) ? { required: true } : null;

    this.form = this.fb.group({
      assignedTo: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      completed: [null, nonNull],
      priority: ['Normal']
    });

    if (this.task) {
      this.isEdit = !!this.task.id;
      this.taskId = this.task.id;
      this.form.patchValue({
        assignedTo: this.task.assignedTo || '',
        description: this.task.description || '',
        dueDate: this.task.dueDate || '',
        completed: !!this.task.completed,
        priority: (this.task as any).priority || 'Normal'
      });
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.taskId = id;
      const task = this.taskService.getById(id);
      if (task) {
        this.form.patchValue({
          assignedTo: task.assignedTo || '',
          description: task.description || '',
          dueDate: task.dueDate || '',
          completed: !!task.completed,
          priority: (task as any).priority || 'Normal'
        });
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEdit && this.taskId) {
      const raw = { ...this.form.value } as any;
      const payload: any = {
        assignedTo: raw.assignedTo,
        description: raw.description,
        dueDate: raw.dueDate,
        completed: !!raw.completed,
        priority: raw.priority
      };
      if (!payload.title && payload.assignedTo) payload.title = payload.assignedTo;
      const updated = this.taskService.update(this.taskId, payload);
      if (this.inModal && updated) {
        this.saved.emit(updated);
        return;
      }
    } else {
      const raw = { ...this.form.value } as any;
      const payload: any = {
        assignedTo: raw.assignedTo,
        description: raw.description,
        dueDate: raw.dueDate,
        completed: !!raw.completed,
        priority: raw.priority
      };
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
