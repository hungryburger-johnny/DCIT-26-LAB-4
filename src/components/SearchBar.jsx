function SearchBar({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortOrderChange,
  onClearFilters,
}) {
  return (
    <section className="search-bar-panel" aria-label="Search and filter products">
      <div className="search-bar-grid">
        <div className="filter-field search-field">
          <label htmlFor="product-search" className="filter-label">
            Search Products
          </label>
          <input
            id="product-search"
            type="text"
            className="filter-input"
            placeholder="Search by keyword (e.g., mouse, handbook)..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="category-select" className="filter-label">
            Category
          </label>
          <select
            id="category-select"
            className="filter-select"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="School Supplies">School Supplies</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="sort-select" className="filter-label">
            Sort By
          </label>
          <select
            id="sort-select"
            className="filter-select"
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="filter-actions">
          <button
            type="button"
            className="clear-filters-btn"
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;