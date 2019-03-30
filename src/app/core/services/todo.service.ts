import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Todo } from '../../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = `${environment.backendUrl}${environment.api}todos`;

  constructor(private http: HttpClient) {}

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
}
