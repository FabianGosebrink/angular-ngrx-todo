import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  @Output() todoAdded = new EventEmitter();

  form: FormGroup;

  constructor(formbuilder: FormBuilder) {
    this.form = formbuilder.group({
      todoValue: ['', Validators.required],
      done: [false],
    });

    // this.form = new FormGroup({
    //   todoValue: new FormControl('', Validators.required),
    //   done: new FormControl(false)
    // });
  }

  addTodo() {
    this.todoAdded.emit(this.form.value.todoValue);
    this.form.reset();
  }
}
