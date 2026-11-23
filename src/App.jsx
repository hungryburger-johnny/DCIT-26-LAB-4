import { useState } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  const handleAddToCart = (productTitle) => {
    setCartCount((prev) => prev + 1);
    setLastAdded(productTitle);
  };

  return (
    <main className="catalog-container">
      <header className="catalog-header">
        <h1>CvSU Mini Store</h1>
        <p className="cart-message">
          {cartCount === 0
            ? "Your cart is empty."
            : `Items added to cart: ${cartCount} (Last added: ${lastAdded})`}
        </p>
      </header>

      <section className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            inStock={product.inStock}
            onAddToCart={handleAddToCart}
          >
            {product.id === 1 && <span className="badge badge-new">New</span>}
            {product.id === 4 && <span className="badge badge-sale">Sale</span>}
          </ProductCard>
        ))}
      </section>
    </main>
  );
}

export default App;