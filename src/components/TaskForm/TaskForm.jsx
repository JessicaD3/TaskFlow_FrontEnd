import { useState } from 'react';
import styles from './TaskForm.module.css';

const emptyForm = { title: '', description: '', priority: 'medium' };

function validate(data) {
  const errors = {};
  if (!data.title.trim()) errors.title = 'Le titre est obligatoire';
  if (data.title.trim().length > 80) errors.title = 'Titre trop long (max 80 caracteres)';
  if (data.description.length > 200) errors.description = 'Description trop longue (max 200 caracteres)';
  return errors;
}

function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [formData, setFormData] = useState(() =>
    editingTask
      ? {
          title: editingTask.title,
          description: editingTask.description || '',
          priority: editingTask.priority || 'medium',
        }
      : emptyForm
  );
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setErrors(validate(updated));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSubmit(formData);
    setFormData(emptyForm);
    setErrors({});
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{editingTask ? 'Modifier la tache' : 'Ajouter une tache'}</h2>
      <div className={styles.group}>
        <label htmlFor="title">Titre</label>
        <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} placeholder="Ex: Reviser React" />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>
      <div className={styles.group}>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Details de la tache" />
        {errors.description && <span className={styles.error}>{errors.description}</span>}
      </div>
      <div className={styles.group}>
        <label htmlFor="priority">Priorite</label>
        <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
          <option value="low">Basse</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
        </select>
      </div>
      <div className={styles.actions}>
        <button type="submit">{editingTask ? 'Enregistrer' : 'Ajouter'}</button>
        {editingTask && (
          <button type="button" className={styles.secondary} onClick={onCancelEdit}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;