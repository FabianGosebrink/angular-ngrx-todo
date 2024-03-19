import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-main',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.css'],
})
export class TodoMainComponent {
  items: Todo[] = [];

  form = this.formBuilder.group({
    todoValue: ['', Validators.required],
    done: [false],
  });

  constructor(
    private readonly http: HttpClient,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.http.get<Todo[]>(`${environment.apiUrl}todos/`).subscribe((items) => {
      this.setSortedItems(items);
    });
  }

  addTodo(): void {
    const toSend = { value: this.form.value.todoValue };

    this.http
      .post<Todo>(`${environment.apiUrl}todos/`, toSend)
      .subscribe((addedItem) => {
        const mergedItems = [...this.items, addedItem];
        this.setSortedItems(mergedItems);
      });
  }

  deleteTodo(item: Todo): void {
    this.http.delete(`${environment.apiUrl}todos/${item.id}`).subscribe(() => {
      const filteredItems = this.items.filter((x) => x.id !== item.id);
      this.setSortedItems(filteredItems);
    });
  }

  markAsDone(item: Todo): void {
    item.done = !item.done;

    this.http
      .put<Todo>(`${environment.apiUrl}todos/${item.id}`, item)
      .subscribe((updatedItem) => {
        const filteredItems = this.items.filter((x) => x.id !== updatedItem.id);
        const mergedItems = [...filteredItems, updatedItem];
        this.setSortedItems(mergedItems);
      });
  }

  private setSortedItems(items: Todo[]): void {
    const sortedItems = items.sort(this.sortByDone());
    this.items = [...sortedItems];
  }

  private sortByDone(): (a: Todo, b: Todo) => number {
    return (a: Todo, b: Todo) => {
      if (a.done < b.done) {
        return -1;
      }
      if (a.done > b.done) {
        return 1;
      }
      return 0;
    };
  }
}
