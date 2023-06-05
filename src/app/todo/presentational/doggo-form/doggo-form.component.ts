import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-doggo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doggo-form.component.html',
  styleUrls: ['./doggo-form.component.css'],
})
export class DoggoFormComponent {
  @Output() todoAdded = new EventEmitter();

  form: FormGroup;

  constructor(formbuilder: FormBuilder) {
    this.form = formbuilder.group({
      todoValue: ['', Validators.required],
      done: [false],
    });
  }

  addTodo() {
    this.todoAdded.emit(this.form.value.todoValue);
    this.form.reset();
  }
}
