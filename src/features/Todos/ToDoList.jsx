import { useSelector, useDispatch } from 'react-redux';
import { selectVisibleTodos, toggleTodo, removeTodo } from './todos-slice';
export const TodoList = () => {
  const filter = useSelector((state) => state.filters);
  const todos = useSelector((state) => selectVisibleTodos(state, filter));
  const dispatch = useDispatch();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.title}>
          <input
            type='checkbox'
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />{' '}
          {todo.title}{' '}
          <button onClick={() => dispatch(removeTodo(todo.id))}>delete</button>
        </li>
      ))}
    </ul>
  );
};
