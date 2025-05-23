import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { backendConfig1 } from '../../constants/mainContent';

const ProductCard = ({ product, showDescription = false }) => {
  const [isHovered, setIsHovered] = useState(false); 
  const {
    _id,
    productName,
    category,
    price,
    discountPrice,
    rating,
    reviewCount,
    images,
    isNew,
    isBestseller,
    isLimited,
    description,
    color,
    defaultImage
  } = product;

  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <div
      className="card group h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[3/4]">
        <Link to={`/products/${_id}`}>
          <img
            src={images?.[0] || 'https://atlas-content-cdn.pixelsquid.com/assets_v2/260/2601734072459859015/previews/G03-200x200.jpg'}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountPrice && (
            <span className="badge-accent">{discountPercentage}% OFF</span>
          )}
          {isNew && <span className="badge-primary">NEW</span>}
          {isLimited && <span className="badge-gold">LIMITED</span>}
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-4 bg-white/80 backdrop-blur-sm transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <button
            className="p-2 rounded-full bg-white text-primary-600 hover:bg-primary-50 shadow-sm transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </button>
          <button
            className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 shadow-sm transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
          <Link
            to={`/products/${_id}`}
            className="p-2 rounded-full bg-white text-primary-600 hover:bg-primary-50 shadow-sm transition-colors"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-sm text-gray-500 mb-1">{category}</span>

        <Link to={`/products/${_id}`} className="hover:text-primary-600 transition-colors">
          <h3 className="font-medium text-sm md:text-lg mb-2 line-clamp-2">{productName}</h3>
        </Link>

        {showDescription && (
          <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2">{description}</p>
        )}

        {/* <div className="flex items-center mb-3">
          <div className="flex items-center text-gold-500 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                className={i < Math.floor(rating) ? 'text-gold-500' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({reviewCount})</span>
        </div> */}

        <div className="mt-auto flex items-center">
          {discountPrice ? (
            <>
              <span className="font-semibold text-lg">₹{discountPrice.toFixed(2)}</span>
              <span className="text-gray-500 line-through text-sm ml-2">
                ₹{price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-semibold text-lg">₹ {price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
