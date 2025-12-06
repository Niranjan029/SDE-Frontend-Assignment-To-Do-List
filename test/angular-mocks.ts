export class MockRouter {
  lastRoute: any = null;

  navigate(route: any[]) {
    this.lastRoute = route;
  }
}

export class MockTaskService {
  data: any[] = [
    { id: '1', title: 'Task A', completed: false },
    { id: '2', title: 'Task B', completed: false }
  ];

  getAll() {
    return [...this.data];
  }

  getById(id: string) {
    return this.data.find(x => x.id === id);
  }

  create(task: any) {
    this.data.push(task);
    return task;
  }

  update(id: string, updated: any) {
    const index = this.data.findIndex(x => x.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updated };
      return this.data[index];
    }
    return null;
  }

  delete(id: string) {
    this.data = this.data.filter(x => x.id !== id);
  }
}
