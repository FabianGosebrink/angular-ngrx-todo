import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo';
import { TodoFormComponent } from '../../presentational/todo-form/todo-form.component';
import { TodoListComponent } from '../../presentational/todo-list/todo-list.component';
import { TodoActions } from '../../store/todo.actions';
import { getAllItems } from '../../store/todo.selectors';

@Component({
  selector: 'app-todo-main',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodoListComponent,
    TodoFormComponent,
  ],
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.css'],
})
export class TodoMainComponent {
  items$: Observable<Todo[]>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.items$ = this.store.pipe(select(getAllItems));

    this.store.dispatch(TodoActions.loadAllTodos());
  }

  addTodo(value: string): void {
    this.store.dispatch(TodoActions.addTodo({ value }));
  }

  deleteTodo(todo: Todo): void {
    this.store.dispatch(TodoActions.deleteTodo({ todo }));
  }

  markAsDone(todo: Todo): void {
    this.store.dispatch(TodoActions.setAsDone({ todo }));
  }
}
