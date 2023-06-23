import { useSelector, useDispatch } from 'react-redux';
import { NewTodo } from './features/Todos/NewTodo';
import { TodoList } from './features/Todos/ToDoList';
import { resetToDefault } from './store';
import { FilterTodo } from './features/Filters/filter';
import { ResetApp } from './features/Reset/ResetApp';
export default function App() {
  return (
    <div className='App'>
      <h1>Hello RTK Todo</h1>
      <NewTodo />
      <FilterTodo />
      <TodoList />
      <ResetApp />
    </div>
  );
}
