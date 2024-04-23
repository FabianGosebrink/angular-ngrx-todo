import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService2 {
  private readonly todoService = inject(TodoService);

  items: Todo[] = [];

  getItems() {
    this.todoService.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  addItem(value: string) {
    this.todoService.addItem(value).subscribe((response: Todo) => {
      this.items.push(response);
    });
  }

  updateItem(value: Todo) {
    this.todoService.updateItem(value).subscribe((response: Todo) => {
      const index = this.items.findIndex((x) => x.id === response.id);

      this.items[index] = response;
    });
  }

  deleteItem(value: Todo) {
    this.todoService.deleteItem(value).subscribe((response: Todo) => {
      this.items = this.items.filter((x) => x.id !== value.id);
    });
  }
}
