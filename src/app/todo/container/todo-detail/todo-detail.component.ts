import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '@app/models/todo';
import * as fromTodoStore from '@app/todo/store';
import { select, Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo$: Observable<Todo>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromTodoStore.TodoState>
  ) {}

  ngOnInit() {
    this.todo$ = this.store.pipe(select(fromTodoStore.getSelectedItem));
    const id = this.route.snapshot.params.id;
    this.store.dispatch(fromTodoStore.loadSingleTodo({ payload: id }));
  }
}
