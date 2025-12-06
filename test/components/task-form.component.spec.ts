import { expect } from 'chai';
const { MockTaskService, MockRouter } = require('../angular-mocks.ts');
import { TaskFormComponent } from '../../src/app/features/tasks/task-form/task-form.component';

describe('TaskFormComponent (Static CRUD) Tests', () => {

  let svc: any;
  let router: any;
  let comp: any;

  function createFakeFormBuilder() {
  return {
    group: (config: any) => {
      const form: any = {
        value: { ...config },
        invalid: false,
        controls: config,

        patchValue(values: any) {
          Object.assign(this.value, values);
        },

        get(key: string) {
          return {
            value: this.value[key],
            touched: false,
            invalid: false
          };
        },

        markAllAsTouched() {},

        // allow assignment to mimic writing form.value = ...
        setValue(values: any) {
          this.value = values;
        }
      };

      return form as any; // ← IMPORTANT (fixes your error)
    }
  };
}


  beforeEach(() => {
    svc = new MockTaskService();
    router = new MockRouter();

    const fbMock = createFakeFormBuilder();

    const routeMock: any = { snapshot: { paramMap: new Map() } };

    comp = new TaskFormComponent(
      fbMock as any,
      svc as any,
      routeMock,
      router as any
    );

    comp.form = fbMock.group({
      assignedTo: 'Form Task',
      description: '',
      completed: false
    });
  });

  it('should create a new task on submit (create mode)', () => {
    comp.isEdit = false;

    comp.submit();

    expect(svc.data.length).to.equal(3);
    expect(router.lastRoute).to.deep.equal(['/tasks']);
  });

  it('should update task on submit (edit mode)', () => {
    // simulate route param
    comp.isEdit = true;
    comp.taskId = '1';

    comp.submit();

    const updated = svc.data.find((t: any) => t.id === '1');
    expect(updated?.title).to.equal('Form Task');
  });

});
