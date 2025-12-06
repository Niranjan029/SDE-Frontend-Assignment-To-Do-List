import { expect } from 'chai';
const { MockTaskService, MockRouter } = require('../angular-mocks.ts');
import { TaskListComponent } from '../../src/app/features/tasks/task-list/task-list.component';

describe('TaskListComponent (Static CRUD) Tests', () => {

  let svc: any;
  let router: any;
  let comp: any;

  beforeEach(() => {
    svc = new MockTaskService();
    router = new MockRouter();
    comp = new TaskListComponent(svc as any, router as any);
  });

  it('should load tasks on init', () => {
    comp.ngOnInit();
    expect(comp.tasks.length).to.equal(2);
  });

  it('should navigate to create page', () => {
    comp.addNew();
    expect(router.lastRoute).to.deep.equal(['/tasks/create']);
  });

  it('should navigate to edit page', () => {
    const task = { id: '1', title: 'Task A' } as any;
    comp.edit(task);
    expect(router.lastRoute).to.deep.equal(['/tasks/edit', '1']);
  });

  it('should delete a task', () => {
    comp.deleteTask({ id: '1', title: 'Task A' } as any);

    expect(svc.data.length).to.equal(1);
    expect(svc.data.find((t: any) => t.id === '1')).to.be.undefined;
  });

});
