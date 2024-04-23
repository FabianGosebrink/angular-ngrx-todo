import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../../models/todo';
import { TodoFormComponent } from '../../presentational/todo-form/todo-form.component';
import { TodoListComponent } from '../../presentational/todo-list/todo-list.component';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-main',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodoFormComponent,
    TodoListComponent,
  ],
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.css'],
})
export class TodoMainComponent {
  private readonly todoService = inject(TodoService);

  items: Todo[] = [];

  getItems() {
    this.todoService.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  addTodo(value: string) {
    this.todoService.addItem(value).subscribe((response: Todo) => {
      this.items.push(response);
    });
  }

  markAsDone(value: Todo) {
    this.todoService.updateItem(value).subscribe((response: Todo) => {
      const index = this.items.findIndex((x) => x.id === response.id);

      this.items[index] = response;
    });
  }

  deleteTodo(value: Todo) {
    this.todoService.deleteItem(value).subscribe((response: Todo) => {
      this.items = this.items.filter((x) => x.id !== value.id);
    });
  }
}
