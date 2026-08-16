function SearchBar({ value, onChange }) {
  return (
    <div className="toolbar-card">
      <input
        type="text"
        placeholder="Rechercher une tâche..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;