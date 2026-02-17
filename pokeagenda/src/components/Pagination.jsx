function Pagination({ page, onPrev, onNext }) {
  return (
    <div className="pagination">
      <button onClick={onPrev} disabled={page === 1}>
        ← Anterior
      </button>

      <span>Página {page}</span>

      <button onClick={onNext}>
        Siguiente →
      </button>
    </div>
  );
}

export default Pagination;