import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: 'tasks', loadChildren: () => import('./features/tasks/tasks-routing.module').then(m => m.TasksRoutingModule) },
];
