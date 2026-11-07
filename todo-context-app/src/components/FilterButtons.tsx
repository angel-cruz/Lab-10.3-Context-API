import { useFilter, type Filter } from '../contexts/FilterContext';

export default function FilterButtons() {
  const { filter, setFilter } = useFilter();
  const filters: Filter[] = ['all', 'active', 'completed'];
  return <div className="filters" role="group" aria-label="Filter todos">
    {filters.map(option => <button key={option} type="button" aria-pressed={filter === option}
      className={filter === option ? 'filter-button selected' : 'filter-button'}
      onClick={() => setFilter(option)}>{option[0].toUpperCase() + option.slice(1)}</button>)}
  </div>;
}
