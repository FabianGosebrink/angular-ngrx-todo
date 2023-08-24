import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo';
import { DoggoFormComponent } from '../../presentational/doggo-form/doggo-form.component';
import { DoggoListComponent } from '../../presentational/doggo-list/doggo-list.component';
import { TodoActions } from '../../store/todo.actions';
import { getAllItems } from '../../store/todo.selectors';

@Component({
  selector: 'app-doggo-main',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DoggoListComponent,
    DoggoFormComponent,
  ],
  templateUrl: './doggo-main.component.html',
  styleUrls: ['./doggo-main.component.css'],
})
export class DoggoMainComponent {
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
