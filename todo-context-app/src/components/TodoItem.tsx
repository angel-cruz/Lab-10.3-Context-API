import { useState } from 'react';
import { useTodos, type Todo } from '../contexts/TodoContext';

export default function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo, deleteTodo, editTodo } = useTodos();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function saveEdit() {
    if (!draft.trim()) return;
    editTodo(todo.id, draft);
    setEditing(false);
  }

  return <li className="todo-item">
    <input type="checkbox" aria-label={`Complete ${todo.text}`} checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
    {editing ? (
      <form className="edit-form" onSubmit={event => { event.preventDefault(); saveEdit(); }}>
        <input aria-label="Edit todo text" value={draft} onChange={event => setDraft(event.target.value)} autoFocus />
        <button type="submit">Save</button>
        <button type="button" onClick={() => { setDraft(todo.text); setEditing(false); }}>Cancel</button>
      </form>
    ) : (
      <>
        <span className={todo.completed ? 'todo-text completed' : 'todo-text'}>{todo.text}</span>
        <button type="button" onClick={() => { setDraft(todo.text); setEditing(true); }}>Edit</button>
        <button className="delete-button" type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
      </>
    )}
  </li>;
}
