import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Todo } from '../../models/todo';
import { TodoActions } from '../../store/todo.actions';
import { TodoState } from '../../store/todo.reducer';
import { featureName } from '../../store/todo.selectors';
import { initialState } from './../../store/todo.reducer';
import { TodoMainComponent } from './todo-main.component';

describe('TodoMainComponent', () => {
  let component: TodoMainComponent;
  let fixture: ComponentFixture<TodoMainComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoMainComponent],
      providers: [
        provideMockStore({
          initialState: { [featureName]: { ...initialState } },
        }),
      ],
    });

    fixture = TestBed.createComponent(TodoMainComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three items when three items are in store', waitForAsync(() => {
    const expectedItems = [
      { id: '1', value: 'test', done: false },
      { id: '2', value: 'test', done: false },
      { id: '3', value: 'test', done: false },
    ] as Todo[];

    store.setState({
      [featureName]: {
        items: expectedItems,
      } as TodoState,
    });

    fixture.detectChanges();

    const res = fixture.debugElement.queryAll(
      (x) => x.nativeElement.tagName === 'LI'
    );

    expect(res.length).toEqual(3);

    component.items$.subscribe((result) => {
      expect(result).toEqual(expectedItems);
    });
  }));

  it('should dispatch correct action when todo is added', () => {
    const spy = spyOn(store, 'dispatch');
    const value = 'test';

    component.addTodo(value);

    expect(spy).toHaveBeenCalledWith(TodoActions.addTodo({ value }));
  });
});
