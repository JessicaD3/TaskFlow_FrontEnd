import { useCallback, useState } from 'react';
import { createTask, deleteTask, updateTask } from '../utils/api';
import { useNotifications } from '../contexts/NotificationContext';

// au dela de 200 taches, c'est une tache locale
function isRealTask(id) {
  return id <= 200;
}

function useTaskOperations(setTasks) {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);
  const { addNotification } = useNotifications();

  const addTask = useCallback(async (taskData) => {
    try {
      setActionLoading(true);
      setActionError(null);
      const newTask = await createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      addNotification('Tache ajoutee avec succes', 'success');
    } catch (err) {
      setActionError(err.message);
      addNotification("Erreur lors de l'ajout de la tache", 'error');
    } finally {
      setActionLoading(false);
    }
  }, [setTasks, addNotification]);

  const editTask = useCallback(async (id, updatedData) => {
    try {
      setActionLoading(true);
      setActionError(null);

      if (!isRealTask(id)) {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t)));
        addNotification('Tache modifiee avec succes', 'success');
        return;
      }

      const updated = await updateTask(id, updatedData);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      addNotification('Tache modifiee avec succes', 'success');
    } catch (err) {
      setActionError(err.message);
      addNotification('Erreur lors de la modification', 'error');
    } finally {
      setActionLoading(false);
    }
  }, [setTasks, addNotification]);

  const removeTask = useCallback(async (id) => {
    try {
      setActionLoading(true);
      setActionError(null);

      if (!isRealTask(id)) {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        addNotification('Tache supprimee', 'success');
        return;
      }

      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      addNotification('Tache supprimee', 'success');
    } catch (err) {
      setActionError(err.message);
      addNotification('Erreur lors de la suppression', 'error');
    } finally {
      setActionLoading(false);
    }
  }, [setTasks, addNotification]);

  const toggleTask = useCallback(async (task) => {
    try {
      setActionLoading(true);
      setActionError(null);
      const newCompleted = !task.completed;

      // tache locale: pas d'appel api juste la mise à jour de l'état
      if (!isRealTask(task.id)) {
        setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, completed: newCompleted } : t)));
        return;
      }

      const updated = await updateTask(task.id, { ...task, completed: newCompleted });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      setActionError(err.message);
      addNotification('Erreur lors du changement de statut', 'error');
    } finally {
      setActionLoading(false);
    }
  }, [setTasks, addNotification]);

  return { actionLoading, actionError, addTask, editTask, removeTask, toggleTask };
}

export default useTaskOperations;