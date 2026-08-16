import { useState } from 'react';
import { createTask, deleteTask, updateTask } from '../utils/api';

// au de la 200 tâche, c'est une tâche locale
function isRealTask(id) {
  return id <= 200;
}

function useTaskOperations(setTasks) {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  async function addTask(taskData) {
    try {
      setActionLoading(true);
      setActionError(null);
      const newTask = await createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  async function editTask(id, updatedData) {
    try {
      setActionLoading(true);
      setActionError(null);

      // Si tâche locale = pas d'API
      if (!isRealTask(id)) {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t)));
        return;
      }

      const updated = await updateTask(id, updatedData);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  async function removeTask(id) {
    try {
      setActionLoading(true);
      setActionError(null);

      // tache locale: pas d'appel api, on retire juste du state
      if (!isRealTask(id)) {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        return;
      }

      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  async function toggleTask(task) {
    try {
      setActionLoading(true);
      setActionError(null);
      const newCompleted = !task.completed;

      // tache locale: pas d'appel api, on met juste a jour le state
      if (!isRealTask(task.id)) {
        setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, completed: newCompleted } : t)));
        return;
      }

      const updated = await updateTask(task.id, { ...task, completed: newCompleted });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  return { actionLoading, actionError, addTask, editTask, removeTask, toggleTask };
}

export default useTaskOperations;