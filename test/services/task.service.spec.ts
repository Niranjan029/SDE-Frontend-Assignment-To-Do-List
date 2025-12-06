import { expect } from 'chai';
import { TaskService } from '../../src/app/core/services/task.service';

describe('TaskService Static CRUD Tests', () => {

  let svc: TaskService;

  beforeEach(() => {
    svc = new TaskService();
  });

  it('should return all tasks', () => {
    const tasks = svc.getAll();
    expect(tasks).to.be.an('array');
    expect(tasks.length).to.be.greaterThan(0);
  });

  it('should create a new task', () => {
    const newTask = svc.create({
      title: 'New Test Task',
      description: 'Test Desc',
      completed: false
    });

    expect(newTask.title).to.equal('New Test Task');
    const tasks = svc.getAll();
    expect(tasks.some(t => t.title === 'New Test Task')).to.be.true;
  });

  it('should get task by id', () => {
    const task = svc.getById('1');
    expect(task).to.not.be.undefined;
    expect(task?.id).to.equal('1');
  });

  it('should update task', () => {
    svc.update('1', { title: 'Updated Title' });
    const updated = svc.getById('1');

    expect(updated?.title).to.equal('Updated Title');
  });

  it('should delete task', () => {
    svc.delete('1');
    const result = svc.getById('1');
    expect(result).to.be.undefined;
  });

});
