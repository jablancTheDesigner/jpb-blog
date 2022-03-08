export default function PageLayout({ children, loading, className }) {
  return (
    <section className={className}>
      {loading && <h1>Loading...</h1>}
      {!loading && <div>{children}</div>}
    </section>
  );
}
