import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/start' },
  { path: 'start', loadChildren: () => import('./start/start.module').then(m => m.StartModule) },
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
  },
];
