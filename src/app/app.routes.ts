import { Routes } from '@angular/router';
import { TodoMainComponent } from './todo-main/todo-main.component';

export const APP_ROUTES: Routes = [
  {
    path: 'todo',
    component: TodoMainComponent,
  },
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
];
