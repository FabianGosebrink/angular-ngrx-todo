import { Todo } from '../models/todo';
import { featureName, getAllItems } from './todo.selectors';

describe('Todo Selectors', () => {
  describe('Todo Items', () => {
    it('should get todo items', () => {
      // arrange
      const items = [
        { id: '1', value: 'test', done: false },
        { id: '2', value: 'test', done: false },
        { id: '3', value: 'test', done: false },
      ] as Todo[];

      const state = {
        [featureName]: {
          items,
        },
      };

      // act
      const result = getAllItems(state);

      // assert
      expect(result).toEqual([
        { id: '1', value: 'test', done: false },
        { id: '2', value: 'test', done: false },
        { id: '3', value: 'test', done: false },
      ]);
    });
  });
});
