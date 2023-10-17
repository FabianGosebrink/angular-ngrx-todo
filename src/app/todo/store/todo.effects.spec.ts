import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { provideMock } from '../../../testing/auto-mock';
import { Todo } from '../models/todo';
import { TodoActions } from './todo.actions';
import { TodoEffects } from './todo.effects';
import { TodoService } from './todo.service';

describe('Todo Effects', () => {
  let effects: TodoEffects;
  let actions$: Observable<Action>;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        provideMock(TodoService),
      ],
    });

    effects = TestBed.inject(TodoEffects);
    todoService = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadTodos$', () => {
    it('should load todos and return correct action', waitForAsync(() => {
      const items = [
        { id: '1', value: 'test', done: false },
        { id: '2', value: 'test', done: false },
        { id: '3', value: 'test', done: false },
      ] as Todo[];

      const spy = spyOn(todoService, 'getItems').and.returnValue(of(items));

      actions$ = of(TodoActions.loadAllTodos());

      effects.loadTodos$.subscribe((result) => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(
          TodoActions.loadAllTodosFinished({ todos: items })
        );
      });
    }));
  });
});
