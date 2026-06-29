export default function ProductCard({ title, description, price }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="price">{price}</p>

      {/* Future Stripe integration */}
      <button>Buy / Download</button>
    </div>
  );
}