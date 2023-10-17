import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  private readonly formbuilder = inject(FormBuilder);

  @Output() todoAdded = new EventEmitter();

  form = this.formbuilder.group({
    todoValue: ['', Validators.required],
    done: [false],
  });

  addTodo() {
    this.todoAdded.emit(this.form.value.todoValue);
    this.form.reset();
  }
}
