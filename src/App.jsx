import { useState } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddToCart = (productTitle) => {
    setCartItems((prev) => [
      ...prev,
      { uid: `${Date.now()}-${Math.random()}`, title: productTitle },
    ]);
  };

  const handleRemoveOne = (uidToRemove) => {
    setCartItems((prev) => prev.filter((item) => item.uid !== uidToRemove));
  };

  const handleClearAll = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.length;
  const lastAdded = cartCount > 0 ? cartItems[cartCount - 1].title : "";

  return (
    <main className="catalog-container">
      <header className="catalog-header">
        <h1>CvSU Mini Store</h1>

        <button
          type="button"
          className="cart-message cart-trigger"
          onClick={() => setIsDrawerOpen((prev) => !prev)}
          aria-expanded={isDrawerOpen}
        >
          {cartCount === 0
            ? "Your cart is empty."
            : `Items added to cart: ${cartCount} (Last added: ${lastAdded})`}
        </button>
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

      {isDrawerOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setIsDrawerOpen(false)}
          role="presentation"
        >
          <aside
            className="cart-drawer"
            aria-label="Cart items drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-drawer-header">
              <div>
                <h2 className="cart-drawer-title">Your Cart ({cartCount})</h2>
                {lastAdded && (
                  <p className="cart-drawer-sub">Last added: {lastAdded}</p>
                )}
              </div>

              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close cart drawer"
              >
                ×
              </button>
            </div>

            <div className="cart-drawer-body">
              {cartCount === 0 ? (
                <p className="cart-empty-note">
                  No items in your cart yet. Click Add to Cart on any in-stock item.
                </p>
              ) : (
                <ul className="cart-item-list">
                  {cartItems.map((item) => (
                    <li key={item.uid} className="cart-item-row">
                      <span className="cart-item-name">{item.title}</span>
                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => handleRemoveOne(item.uid)}
                        aria-label={`Remove ${item.title}`}
                        title={`Remove ${item.title}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartCount > 0 && (
              <div className="cart-drawer-footer">
                <button
                  type="button"
                  className="clear-cart-btn"
                  onClick={handleClearAll}
                >
                  Clear All
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}

export default App;