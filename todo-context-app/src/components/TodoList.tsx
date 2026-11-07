import { useTodos } from '../contexts/TodoContext';
import { useFilter } from '../contexts/FilterContext';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { todos, clearCompleted } = useTodos();
  const { filter } = useFilter();

  // Show only the tasks matching the selected filter.
  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  const completedCount = todos.filter(todo => todo.completed).length;

  return <section className="todo-results" aria-label="Todo list">
    {visibleTodos.length === 0 ? (
      <p className="empty-message">{todos.length === 0 ? 'No todos yet! Add one above.' : 'No todos match this filter.'}</p>
    ) : <ul className="todo-list">{visibleTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}</ul>}
    {completedCount > 0 && <div className="list-footer">
      <span>{todos.length - completedCount} active · {completedCount} completed</span>
      <button type="button" onClick={clearCompleted}>Clear Completed</button>
    </div>}
  </section>;
}
