import styles from './Pagination.module.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Precedent
      </button>

      <span className={styles.pageInfo}>
        Page {currentPage} / {totalPages}
      </span>

      <button
        type="button"
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Suivant
      </button>
    </div>
  );
}

export default Pagination;