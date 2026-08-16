import React from 'react';
import styles from './TaskItem.module.css';

const PRIORITY_LABELS = { low: 'Basse', medium: 'Moyenne', high: 'Haute' };

const TaskItem = React.memo(function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const cardClass = task.completed ? `${styles.card} ${styles.completed}` : styles.card;

  return (
    <article className={cardClass}>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description || 'Aucune description'}</p>
        <span className={`${styles.badge} ${styles[task.priority]}`}>
          Priorité: {PRIORITY_LABELS[task.priority]}
        </span>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={() => onToggle(task)}>
          {task.completed ? 'Reactiver' : 'Terminer'}
        </button>
        <button type="button" onClick={() => onEdit(task)}>
          Modifier
        </button>
        <button type="button" onClick={() => onDelete(task.id)}>
          Supprimer
        </button>
      </div>
    </article>
  );
});

export default TaskItem;