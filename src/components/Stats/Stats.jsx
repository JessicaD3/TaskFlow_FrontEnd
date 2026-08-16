function Stats({ stats }) {
  return (
    <section className="stats-card">
      <h2>Statistiques</h2>

      <div className="stats-grid">
        <div>
          <strong>{stats.total}</strong>
          <span>Total</span>
        </div>
        <div>
          <strong>{stats.completed}</strong>
          <span>Terminées</span>
        </div>
        <div>
          <strong>{stats.remaining}</strong>
          <span>Restantes</span>
        </div>
      </div>

      <div className="progress-wrapper">
        <div className="progress-bar" style={{ width: `${stats.progress}%` }} />
      </div>
      <p>{stats.progress}% complété</p>
    </section>
  );
}

export default Stats;