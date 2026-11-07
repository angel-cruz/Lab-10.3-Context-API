import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import ThemeToggleButton from './components/ThemeToggleButton';
import './App.css';

export default function App() {
  return <main className="app-shell">
    <header className="app-header">
      <h1>Todo App<br />(Context API)</h1>
      <ThemeToggleButton />
    </header>
    <hr />
    <TodoInput />
    <FilterButtons />
    <TodoList />
  </main>;
}
