function ProductCard({
  title,
  price,
  category = "General",
  inStock,
  onAddToCart,
  children,
}) {
  const formattedPrice = `₱${Number(price).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <article className={`product-card ${inStock ? "in-stock" : "out-of-stock"}`}>
      <div className="product-card-top">
        <span className="product-category">{category}</span>
        {children && <div className="product-badges">{children}</div>}
      </div>

      <h2 className="product-title">{title}</h2>
      <p className="product-price">{formattedPrice}</p>

      <p className={`stock-status ${inStock ? "status-in" : "status-out"}`}>
        {inStock ? "In Stock" : "Out of Stock"}
      </p>

      <button
        type="button"
        className="add-to-cart-btn"
        disabled={!inStock}
        onClick={() => onAddToCart(title)}
      >
        Add to Cart
      </button>
    </article>
  );
}

export default ProductCard;