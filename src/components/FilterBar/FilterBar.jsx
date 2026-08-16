function FilterBar({ currentFilter, onFilterChange, counts }) {
  return (
    <div className="toolbar-card filter-bar">
      <button
        type="button"
        className={currentFilter === 'all' ? 'active' : ''}
        onClick={() => onFilterChange('all')}
      >
        Toutes ({counts.all})
      </button>
      <button
        type="button"
        className={currentFilter === 'todo' ? 'active' : ''}
        onClick={() => onFilterChange('todo')}
      >
        A faire ({counts.todo})
      </button>
      <button
        type="button"
        className={currentFilter === 'done' ? 'active' : ''}
        onClick={() => onFilterChange('done')}
      >
        Terminées ({counts.done})
      </button>
    </div>
  );
}

export default FilterBar;