import { useDispatch } from 'react-redux';
import { setFilter } from './filter-slice';
export const FilterTodo = () => {
  const dispatch = useDispatch();

  const handleFilter = (val) => dispatch(setFilter(val));
  return (
    <div>
      <button onClick={() => handleFilter('all')}>all</button>
      <button onClick={() => handleFilter('active')}>active</button>
      <button onClick={() => handleFilter('completed')}>completed</button>
    </div>
  );
};
