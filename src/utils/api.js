const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

// verifie que la reponse est ok
async function checkResponse(response) {
  if (!response.ok) throw new Error(`Erreur ${response.status}`);
  return response.json();
}

export async function fetchTasks() {
  try {
    const response = await fetch(BASE_URL);
    const data = await checkResponse(response);
    return data.slice(0, 12).map((item) => ({
      id: item.id,
      title: item.title,
      description: '',
      priority: 'medium',
      completed: item.completed,
    }));
  } catch (err) {
    throw new Error('Erreur chargement taches: ' + err.message);
  }
}

export async function fetchTaskById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await checkResponse(response);
  } catch (err) {
    throw new Error('Erreur chargement tache: ' + err.message);
  }
}

export async function createTask(taskData) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    const created = await checkResponse(response);
    // l'api ne persiste pas vraiment donc on reconstruit la tache
    return {
      id: created.id || Date.now(),
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      completed: false,
    };
  } catch (err) {
    throw new Error('Erreur creation tache: ' + err.message);
  }
}

export async function updateTask(id, taskData) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    await checkResponse(response);
    return { id, ...taskData };
  } catch (err) {
    throw new Error('Erreur modification tache: ' + err.message);
  }
}

export async function deleteTask(id) {
  try {
    // le DELETE renvoie 204 sans contenu
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
    return id;
  } catch (err) {
    throw new Error('Erreur suppression tache: ' + err.message);
  }
}