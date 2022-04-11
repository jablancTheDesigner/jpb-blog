export default function PageLayout({ children, loading, className }) {
  return (
    <section className={className}>
      {loading && (
        <div className="loader">
          <div className="container text-center">
            <h1>Loading...</h1>
          </div>
        </div>
      )}
      {!loading && <>{children}</>}
    </section>
  );
}
