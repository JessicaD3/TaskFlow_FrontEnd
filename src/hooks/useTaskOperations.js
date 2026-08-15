import { useState } from 'react';
import { createTask, deleteTask, updateTask } from '../utils/api';

function useTaskOperations(setTasks) {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  async function addTask(taskData) {
    try {
      setActionLoading(true);
      setActionError(null);
      const newTask = await createTask(taskData);
      // on ajoute la nouvelle tache en tete de liste
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
      const updated = await updateTask(id, updatedData);
      // on remplace uniquement la tache concernee dans la liste
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
      await deleteTask(id);
      // on retire la tache supprimee de la liste
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
      // on inverse juste le champ completed, le reste ne change pas
      const updated = await updateTask(task.id, { ...task, completed: !task.completed });
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