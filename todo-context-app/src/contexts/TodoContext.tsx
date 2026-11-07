import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';

// This is the shape of one task.
export interface Todo { id: string; text: string; completed: boolean }

type Action =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: string }
  | { type: 'delete'; id: string }
  | { type: 'edit'; id: string; text: string }
  | { type: 'clearCompleted' };

interface TodoContextValue {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  clearCompleted: () => void;
}

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

// The reducer decides how the list changes for each action.
function todoReducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add':
      return [...todos, { id: crypto.randomUUID(), text: action.text, completed: false }];
    case 'toggle':
      return todos.map(todo => todo.id === action.id ? { ...todo, completed: !todo.completed } : todo);
    case 'delete':
      return todos.filter(todo => todo.id !== action.id);
    case 'edit':
      return todos.map(todo => todo.id === action.id ? { ...todo, text: action.text } : todo);
    case 'clearCompleted':
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
}

// Read saved tasks once when the app first starts.
function loadTodos(): Todo[] {
  try {
    const saved = localStorage.getItem('todos');
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is Todo =>
      item !== null && typeof item === 'object' &&
      typeof item.id === 'string' && typeof item.text === 'string' &&
      typeof item.completed === 'boolean'
    );
  } catch {
    return []; // Bad stored data should not crash the app.
  }
}

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, [], loadTodos);

  // Save whenever the todo list changes.
  useEffect(() => { localStorage.setItem('todos', JSON.stringify(todos)); }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim()) dispatch({ type: 'add', text: text.trim() });
  };
  const toggleTodo = (id: string) => dispatch({ type: 'toggle', id });
  const deleteTodo = (id: string) => dispatch({ type: 'delete', id });
  const editTodo = (id: string, newText: string) => {
    if (newText.trim()) dispatch({ type: 'edit', id, text: newText.trim() });
  };
  const clearCompleted = () => dispatch({ type: 'clearCompleted' });

  return <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted }}>
    {children}
  </TodoContext.Provider>;
}

// Components call this hook instead of receiving props from App.
export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos must be used inside TodoProvider');
  return context;
}
