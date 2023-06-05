import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Todo } from '../../models/todo';
import { DoggoFormComponent } from '../../presentational/doggo-form/doggo-form.component';
import { DoggoListComponent } from '../../presentational/doggo-list/doggo-list.component';

@Component({
  selector: 'app-doggo-main',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DoggoListComponent,
    DoggoFormComponent,
  ],
  templateUrl: './doggo-main.component.html',
  styleUrls: ['./doggo-main.component.css'],
})
export class DoggoMainComponent {
  items: Todo[] = [];
  form: FormGroup;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Todo[]>(`${environment.apiUrl}todos/`).subscribe((items) => {
      this.setSortedItems(items);
    });

    this.form = new FormGroup({
      todoValue: new FormControl('', Validators.required),
    });
  }

  addTodo(value: string): void {
    const toSend = { value };

    this.http
      .post<Todo>(`${environment.apiUrl}todos/`, toSend)
      .subscribe((addedItem) => {
        const mergedItems = [...this.items, addedItem];
        this.setSortedItems(mergedItems);
      });

    this.form.reset();
  }

  deleteTodo(item: Todo): void {
    this.http.delete(`${environment.apiUrl}todos/${item.id}`).subscribe(() => {
      const filteredItems = this.items.filter((x) => x.id !== item.id);
      this.setSortedItems(filteredItems);
    });
  }

  markAsDone(item: Todo): void {
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
