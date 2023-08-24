import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-doggo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doggo-form.component.html',
  styleUrls: ['./doggo-form.component.css'],
})
export class DoggoFormComponent {
  @Output() todoAdded = new EventEmitter();

  form = this.formbuilder.group({
    todoValue: ['', Validators.required],
    done: [false],
  });

  constructor(private formbuilder: FormBuilder) {}

  addTodo() {
    this.todoAdded.emit(this.form.value.todoValue);
    this.form.reset();
  }
}
