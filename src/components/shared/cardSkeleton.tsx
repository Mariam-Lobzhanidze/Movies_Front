const CardSkeleton = () => (
  <div className="movie skeleton">
    <div className="poster-container">
      <div className="placeholder placeholder-wave bg-secondary w-100" />
    </div>

    <div className="card-title gap-2">
      <div className="movie-info w-100">
        <h3 className="placeholder w-100"></h3>
        <span className="tag placeholder bg-secondary w-25">
          <svg></svg>
        </span>
      </div>

      <span className="placeholder favorite-icon w-25"></span>
    </div>

    <div className="watchlist-btn">
      <button type="button" className="btn btn-dark text-primary placeholder">
        <p></p>
      </button>
    </div>
  </div>
);

export default CardSkeleton;
