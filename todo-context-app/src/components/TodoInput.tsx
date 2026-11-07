import { useState, type FormEvent } from 'react';
import { useTodos } from '../contexts/TodoContext';

export default function TodoInput() {
  const [text, setText] = useState('');
  const { addTodo } = useTodos();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the browser from reloading.
    if (!text.trim()) return;
    addTodo(text);
    setText(''); // Empty the input after adding a task.
  }

  return <form className="todo-input" onSubmit={handleSubmit}>
    <input aria-label="New todo" placeholder="What needs to be done?" value={text} onChange={event => setText(event.target.value)} />
    <button className="primary-button" type="submit">Add Todo</button>
  </form>;
}
