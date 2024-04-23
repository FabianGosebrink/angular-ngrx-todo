import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-main',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.css'],
})
export class TodoMainComponent {
  private readonly service = inject(TodoService);
  private readonly formbuilder = inject(FormBuilder);

  form = this.formbuilder.group({
    todoValue: ['', Validators.required],
    done: [false],
  });

  items: Todo[] = [];

  ngOnInit(): void {
    this.service.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  addTodo() {
    this.service
      .addItem(this.form.value.todoValue)
      .subscribe((response: Todo) => {
        this.items.push(response);
        this.form.reset();
      });
  }

  moveToDone(item: Todo) {
    item.done = !item.done;
    this.service.updateItem(item).subscribe((response: Todo) => {
      const index = this.items.findIndex((x) => x.id === response.id);

      this.items[index] = response;
    });
  }

  deleteItem(item: Todo) {
    if (confirm('Really delete?')) {
      this.service.deleteItem(item).subscribe((response: Todo) => {
        this.items = this.items.filter((x) => x.id !== item.id);
      });
    }
  }
}
