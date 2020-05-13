import { writable } from 'svelte/store';
import generateUniqueId from 'generate-unique-id';

const createTodos = () => {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    setTodos: todos => {
      set(todos);
    },
    addTodo: todo => {
      update(todos =>
        todos.concat({
          id: generateUniqueId(),
          text: todo,
          isDone: false
        })
      );
    },
    updateTodo: (todo, data) => {
      update(todos =>
        todos.map((item, index) => {
          if (item === todo) {
            todos[index] = {
              ...todo,
              ...data
            };
            return todos[index];
          }
          return item;
        })
      );
    },
    deleteTodo: todo => {
      update(todos => todos.filter(item => todo !== item));
    }
  };
};

export const todos = createTodos();
