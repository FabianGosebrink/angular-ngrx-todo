import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/start' },
  { path: 'start', loadChildren: './start/start.module#StartModule' },
  {
    path: 'todo',
    loadChildren: './todo/todo.module#TodoModule',
  },
];
