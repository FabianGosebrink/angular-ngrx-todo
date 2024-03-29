import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);

  private url = `${environment.apiUrl}todos`;

  getItems() {
    return this.http.get<Todo[]>(this.url);
  }

  getItem(id: string) {
    return this.http.get<Todo>(`${this.url}/${id}`);
  }

  addItem(value: string) {
    return this.http.post<Todo>(this.url, { value });
  }

  updateItem(value: Todo) {
    return this.http.put<Todo>(`${this.url}/${value.id}`, value);
  }

  deleteItem(value: Todo) {
    return this.http.delete(`${this.url}/${value.id}`);
  }
}
