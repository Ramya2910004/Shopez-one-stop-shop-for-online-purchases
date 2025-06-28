import React from 'react';
import './ProductGrid.css';

const fallbackImg = 'https://via.placeholder.com/300x200?text=No+Image';

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product._id} className="product-card">
          <div className="product-image">
            <img
              src={product.mainImg}
              alt={product.title}
              onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }}
            />
          </div>
          <div className="product-info">
            <h3 className="product-name">{product.title}</h3>
            <div className="product-details">
              <span className="product-brand">{product.gender || 'Unisex'}</span>
              <span className="product-category">{product.category}</span>
            </div>
            <div className="product-price">
              ${product.price.toFixed(2)}
            </div>
            {product.discount > 0 && (
              <div className="product-discount">
                {product.discount}% OFF
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid; 