// import { createStore } from 'redux';
import { configureStore, createAction } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { filterReducer } from './features/Filters/filter-slice';
import { todoReducer } from './features/Todos/todos-slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = combineReducers({
  todos: todoReducer,
  filters: filterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: todoSlice.reducer,
  // вместо combineReducer:
  reducer: persistedReducer,
  // подключение девтулз
  devTools: true,
  // определение middleWare для приложения. В данном случае добавляем в дефолтным еще logger из библы
  // redux-thunk тоже сразу идут из коробки в defaultMiddleWare
  middleware: (getDefauleMiddleware) =>
    getDefauleMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  // то состояние, которое будет загружено сразу с приложением. Например, что-то из localStorage
  preloadedState: {
    todos: [{ title: 'React', id: 1, completed: true }],
  },
  // какие-либо внешние библиотеки с функциями, которые могут усилиивать наш store или еще чет делать
  enhancers: [],
});

export const persistor = persistStore(store);

// export const addTodo = createAction('@@todos/ADD_TODO', (title) => ({
//   payload: {
//     title,
//     id: nanoid(),
//     completed: false,
//   },
// }));
// console.log(addTodo.toString());
// console.log(addTodo());
// console.log(addTodo('learn redux'));

// export const removeTodo = createAction('@@todos/REMOVE_TODO');
// export const toggleTodo = createAction('@@todos/TOGGLE_TODO');

// const todos = createReducer([], {
//   [addTodo]: (state, action) => void state.push(action.payload),
//   [toggleTodo]: (state, action) => {
//     const todo = state.find((todo) => todo.id === action.payload);
//     todo.completed = !todo.completed;
//   },
//   [removeTodo]: (state, action) =>
//     state.filter((todo) => todo.id !== action.payload),
// });
