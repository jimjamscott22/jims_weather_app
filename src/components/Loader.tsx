export const Loader = () => (
  <div className="loader" role="status">
    <span className="loader__label">Loading forecast</span>
    <span className="loader__dots" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  </div>
);