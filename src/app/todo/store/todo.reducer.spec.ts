import { TodoActions } from './todo.actions';
import { initialState, todoReducer } from './todo.reducer';

describe('Todo Reducer', () => {
  it('should set loading to true when TodoActions.addTodo is applied', () => {
    // arrange
    const action = TodoActions.addTodo({ value: 'test' });

    // act
    const result = todoReducer(initialState, action);

    // assert
    expect(result).toEqual({ items: [], selectedItem: null, loading: true });
  });
});
