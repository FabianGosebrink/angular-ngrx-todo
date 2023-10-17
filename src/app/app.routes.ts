import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'todo',
    loadChildren: () => import('./todo/index').then((m) => m.TODO_ROUTES),
  },
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
];
