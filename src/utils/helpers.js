// filtre les taches selon le statut et la recherche
export function filterTasks(tasks, filter, searchTerm) {
  let result = tasks;

  if (filter === 'todo') result = result.filter((t) => !t.completed);
  if (filter === 'done') result = result.filter((t) => t.completed);

  if (searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    result = result.filter((t) =>
      t.title.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term)
    );
  }

  return result;
}

// calcule les stats globales (total, termine, restant, pourcentage)
export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const remaining = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { total, completed, remaining, progress };
}

// compte les taches par categorie pour les badges de la FilterBar
export function getFilterCounts(tasks) {
  return {
    all: tasks.length,
    todo: tasks.filter((t) => !t.completed).length,
    done: tasks.filter((t) => t.completed).length,
  };
}