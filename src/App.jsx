import { useCallback, useMemo, useState } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import FilterBar from './components/FilterBar/FilterBar';
import SearchBar from './components/SearchBar/SearchBar';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Stats from './components/Stats/Stats';
import useDebounce from './hooks/useDebounce';
import useFetch from './hooks/useFetch';
import useTaskOperations from './hooks/useTaskOperations';
import { filterTasks, getFilterCounts, getTaskStats } from './utils/helpers';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

function normalizeTasks(rawTasks) {
  return rawTasks.slice(0, 12).map((item) => ({
    id: item.id,
    title: item.title,
    description: '',
    priority: 'medium',
    completed: item.completed,
  }));
}

function App() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data: rawTasks, loading, error } = useFetch(API_URL);
  const [tasks, setTasks] = useState([]);
  const [lastRawTasks, setLastRawTasks] = useState(null);

  // normalise les donnees de l'api
  if (rawTasks && rawTasks !== lastRawTasks) {
    setLastRawTasks(rawTasks);
    setTasks(normalizeTasks(rawTasks));
  }

  const { addTask, editTask, removeTask, toggleTask, actionLoading, actionError } =
    useTaskOperations(setTasks);

  const filteredTasks = useMemo(
    () => filterTasks(tasks, filter, debouncedSearch),
    [tasks, filter, debouncedSearch]
  );
  const stats = useMemo(() => getTaskStats(tasks), [tasks]);
  const counts = useMemo(() => getFilterCounts(tasks), [tasks]);

  const handleSubmitTask = useCallback(
    async (formData) => {
      if (editingTask) {
        await editTask(editingTask.id, { ...editingTask, ...formData });
        setEditingTask(null);
      } else {
        await addTask({ ...formData, completed: false });
      }
    },
    [editingTask, editTask, addTask]
  );

  const handleCancelEdit = useCallback(() => setEditingTask(null), []);

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <h1>Taskflow</h1>
          <p>Organise tes tâches.</p>
        </div>
        <ThemeToggle />
      </header>

      {(error || actionError) && (
        <div className="alert error">{error || actionError}</div>
      )}

      <main className="layout">
        <section className="left-column">
          <TaskForm
            key={editingTask ? editingTask.id : 'new'}
            onSubmit={handleSubmitTask}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
          />
          <Stats stats={stats} />
        </section>

        <section className="right-column">
          <div className="toolbar">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <FilterBar currentFilter={filter} onFilterChange={setFilter} counts={counts} />
          </div>

          <div className="list-header">
            <h2>Mes tâches</h2>
          </div>

          {loading || actionLoading ? (
            <div className="alert">Chargement en cours...</div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onDelete={removeTask}
              onToggle={toggleTask}
              onEdit={setEditingTask}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;