import { createContext, useContext, useState, type ReactNode } from 'react';

export type Filter = 'all' | 'active' | 'completed';
interface FilterContextValue { filter: Filter; setFilter: (filter: Filter) => void }
const FilterContext = createContext<FilterContextValue | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  // Only one filter is selected at a time.
  const [filter, setFilter] = useState<Filter>('all');
  return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>;
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilter must be used inside FilterProvider');
  return context;
}
