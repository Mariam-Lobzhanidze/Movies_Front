const CardSkeleton = () => (
  <div className="movie skeleton">
    <div className="poster-container">
      <div className="placeholder placeholder-wave bg-secondary w-100" />
    </div>
    <div className="movie-info">
      <h3 className="placeholder w-100"></h3>
      <span className="tag placeholder bg-secondary col-7">
        <svg></svg>
      </span>
    </div>
  </div>
);

export default CardSkeleton;
