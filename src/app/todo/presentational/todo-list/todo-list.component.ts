import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '@app/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() items: Todo[] = [];
  @Input() doneItems: Todo[] = [];

  @Output() markAsDone = new EventEmitter();
  @Output() delete = new EventEmitter();

  moveToDone(item: Todo) {
    item.done = true;
    this.markAsDone.emit(item);
  }

  deleteItem(item: Todo) {
    if (confirm('Really delete')) {
      this.delete.emit(item);
    }
  }
}
