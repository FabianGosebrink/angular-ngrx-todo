import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService2 } from '../services/todo.service2';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  private readonly service = inject(TodoService2);
  private readonly formbuilder = inject(FormBuilder);

  form = this.formbuilder.group({
    todoValue: ['', Validators.required],
    done: [false],
  });

  addTodo() {
    this.service.addItem(this.form.value.todoValue);
  }
}
