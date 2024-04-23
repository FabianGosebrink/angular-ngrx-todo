import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService2 } from '../services/todo.service2';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  private readonly service = inject(TodoService2);

  items: Todo[] = [];

  ngOnInit(): void {
    this.items = this.service.items;
  }

  moveToDone(item: Todo) {
    item.done = !item.done;
    this.service.updateItem(item);
  }

  deleteItem(item: Todo) {
    if (confirm('Really delete?')) {
      this.service.deleteItem(item);
    }
  }
}
