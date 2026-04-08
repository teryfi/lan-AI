export default function Loading() {
  return (
    <div className="route-loading-shell" aria-live="polite" aria-busy="true">
      <div className="route-loading-card">
        <div className="route-loading-line route-loading-line-lg" />
        <div className="route-loading-line route-loading-line-md" />
        <div className="route-loading-grid">
          <div className="route-loading-tile" />
          <div className="route-loading-tile" />
          <div className="route-loading-tile" />
        </div>
      </div>
    </div>
  );
}
