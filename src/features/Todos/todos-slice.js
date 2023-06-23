import { createSlice, nanoid } from '@reduxjs/toolkit';
import { resetToDefault } from '../Reset/reset-action';
export const todoSlice = createSlice({
  name: '@@todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title) => ({
        payload: {
          title,
          id: nanoid(),
          completed: false,
        },
      }),
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
  },
  extraReducers: (buider) => {
    buider.addCase(resetToDefault, () => {
      return [];
    });
  },
});
export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;

export const selectVisibleTodos = (state, filter) => {
  switch (filter) {
    case 'all': {
      return state.todos;
    }
    case 'active': {
      return state.todos.filter((todo) => !todo.completed);
    }
    case 'completed': {
      return state.todos.filter((todo) => todo.completed);
    }
    default: {
      return state.todos;
    }
  }
};
