const TrailerDetailsSkeleton = () => {
  return (
    <div className="trailer-page">
      <div className="trailer">
        <div className="trailer-video placeholder bg-secondary w-100"></div>
        <div className="trailer-details">
          <div className="trailer-details-header">
            <div className="poster-img-container placeholder bg-secondary flex-fill">
              <img />
            </div>
            <div className="details-text flex-fill">
              <h4 className="details-text-title placeholder bg-primary rounded col-9 mb-2"></h4>
              <p className="details-text-genre placeholder bg-secondary rounded col-6"></p>
            </div>
          </div>
          <div className="trailer-details-overview">
            <span className="tagline placeholder bg-secondary w-100"></span>
            <p className="overview placeholder bg-primary rounded w-100"></p>

            <div className="trailer-details-footer mt-3">
              <span className="status placeholder bg-secondary w-50"></span>
              <span className="rating placeholder bg-secondary rounded w-25"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerDetailsSkeleton;
