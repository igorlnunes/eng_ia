import { useState, type FormEvent } from 'react';
import { SearchInput } from '../atoms/SearchInput';

export interface SearchBarProps {
  initialValue?: string;
  onSearch: (term: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  initialValue = '',
  onSearch,
  placeholder = 'Digite o que você procura',
  className = '',
}: SearchBarProps) {
  const [term, setTerm] = useState(initialValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(term);
  };

  const handleClear = () => {
    setTerm('');
    onSearch('');
  };

  const handleChange = (val: string) => {
    setTerm(val);
    if (!val) {
      onSearch('');
    }
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 w-full max-w-xl ${className}`}
    >
      <SearchInput
        value={term}
        onChange={handleChange}
        onClear={handleClear}
        placeholder={placeholder}
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="px-4 py-2.5 rounded-lg bg-brand-card hover:bg-[#253342] text-brand-green font-medium text-sm border border-brand-border hover:border-brand-green/40 transition-colors cursor-pointer shrink-0"
      >
        Buscar
      </button>
    </form>
  );
}
