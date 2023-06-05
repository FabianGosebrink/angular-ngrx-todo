import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-doggo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doggo-list.component.html',
  styleUrls: ['./doggo-list.component.css'],
})
export class DoggoListComponent {
  @Input() items: Todo[] = [];
  @Input() doneItems: Todo[] = [];

  @Output() markAsDone = new EventEmitter();
  @Output() delete = new EventEmitter();

  moveToDone(item: Todo) {
    item.done = true;
    this.markAsDone.emit(item);
  }

  deleteItem(item: Todo) {
    if (confirm('Really delete?')) {
      this.delete.emit(item);
    }
  }
}
