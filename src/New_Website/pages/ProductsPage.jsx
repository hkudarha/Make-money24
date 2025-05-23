import { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../../api/user.api';
import PageLoader from '../../Component/PageLoader';
import { useLocation } from 'react-router-dom';

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOption, setSortOption] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category');
  const selectedSubcategory = queryParams.get('subcategory');
  const getAllProductsList = async () => {
    try {
      const response = await getAllProducts();
      if (response?.data) {
        setAllProducts(response?.data?.data);
        setFilteredProducts(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getAllProductsList();
  }, []);

  useEffect(() => {
    let result = [...allProducts];

    if (selectedCategory) {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedSubcategory) {
      result = result.filter(
        (p) => p.subCategory?.toLowerCase() === selectedSubcategory.toLowerCase()
      );
    }

    result = result.filter(p => {
      const priceToCompare = p.discountPrice || p.price;
      return priceToCompare >= priceRange[0] && priceToCompare <= priceRange[1];
    });

    switch (sortOption) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'price-asc':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    setFilteredProducts(result);
  }, [allProducts, selectedCategory, selectedSubcategory, priceRange, sortOption]);


  return (
    <div className="container-custom py-24">
      <div className="mb-12 pt-10">
        <h1 className="text-4xl font-bold mb-4">All Products</h1>
        <p className="text-gray-600 max-w-2xl">
          Browse our complete collection of premium products, carefully curated for quality and style.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                className="lg:hidden flex items-center gap-1 text-primary-600"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            <div className={`${showFilters ? 'block' : 'hidden lg:block'} space-y-8`}>
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="10"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
                    className="w-full"
                  />
                </div>
              </div>
              <button
                className="text-primary-600 hover:text-primary-700 font-medium"
                onClick={() => {
                  setCategoryFilter(null);
                  setPriceRange([0, 5000]);
                  window.history.replaceState(null, '', '/products');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            {/* <div className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {allProducts.length} products
            </div> */}
            <div className="relative inline-block">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} />
                <label htmlFor="sort-options">Sort by:</label>
                <select
                  id="sort-options"
                  value={sortOption}
                  onChange={e => setSortOption(e.target.value)}
                  className="bg-white border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(p => (
                <ProductCard key={p._id} product={p} showDescription />
              ))}
            </div>
          ) : (
            <div className="">
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
              </div>
              {/* <PageLoader /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
