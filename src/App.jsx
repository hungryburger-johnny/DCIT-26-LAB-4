import { useEffect, useState } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Debounce typing by 300ms and clean up previous timer on rapid changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const normalizedQuery = debouncedSearch.trim().toLowerCase();

  // Derive filtered & sorted list without mutating original products array
  const visibleProducts = [...products]
    .filter((product) => {
      const matchesKeyword =
        normalizedQuery === "" ||
        product.title.toLowerCase().includes(normalizedQuery);
      const matchesCategory =
        category === "All" ||
        product.category.toLowerCase() === category.toLowerCase();
      return matchesKeyword && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "price-asc") {
        return a.price - b.price;
      }
      if (sortOrder === "price-desc") {
        return b.price - a.price;
      }
      return 0;
    });

  // Update browser tab title whenever result count changes
  useEffect(() => {
    document.title = `CvSU Mini Store (${visibleProducts.length} results)`;
  }, [visibleProducts.length]);

  const handleClearFilters = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  };

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

  const groupedCartItems = cartItems.reduce((groups, item) => {
    const existingIndex = groups.findIndex((entry) => entry.title === item.title);
    if (existingIndex !== -1) {
      const updated = [...groups];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + 1,
        latestUid: item.uid,
      };
      return updated;
    }
    return [
      ...groups,
      {
        title: item.title,
        quantity: 1,
        latestUid: item.uid,
      },
    ];
  }, []);

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

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onClearFilters={handleClearFilters}
      />

      <div className="results-bar">
        <p className="results-count">
          Showing {visibleProducts.length} of {products.length} products
        </p>
      </div>

      {visibleProducts.length === 0 ? (
        <div className="empty-state" role="status">
          <p>No products found. Try a different keyword or category.</p>
          <button
            type="button"
            className="clear-filters-btn"
            onClick={handleClearFilters}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <section className="product-grid">
          {visibleProducts.map((product) => (
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
      )}

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
                  No items in your cart yet. Click Add to Cart on any in-stock
                  item.
                </p>
              ) : (
                <ul className="cart-item-list">
                  {groupedCartItems.map((entry) => (
                    <li key={entry.title} className="cart-item-row">
                      <div className="cart-item-info">
                        <span className="cart-item-name">{entry.title}</span>
                        <span className="cart-item-qty">×{entry.quantity}</span>
                      </div>
                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => handleRemoveOne(entry.latestUid)}
                        aria-label={`Remove one ${entry.title}`}
                        title={`Remove one ${entry.title}`}
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