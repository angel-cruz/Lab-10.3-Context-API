import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return <button className="theme-button" type="button" onClick={toggleTheme}>
    {theme === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
  </button>;
}
