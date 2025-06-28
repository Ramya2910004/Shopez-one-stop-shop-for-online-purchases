import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function EditProduct() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:6001/fetch-product-details/${productId}`)
      .then(res => {
        setProduct(res.data);
        setMainImg(res.data.mainImg || '');
        setProductUrl(res.data.productUrl || '');
        setLoading(false);
      })
      .catch(() => {
        setError('Product not found');
        setLoading(false);
      });
  }, [productId]);

  const handleSave = () => {
    axios.put(`http://localhost:6001/update-product/${productId}`, {
      ...product,
      mainImg,
      productUrl,
    })
      .then(() => setSuccess(true))
      .catch(() => setError('Failed to update product'));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h2>Edit Product Image & URL</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Image URL:</label>
        <input
          type="text"
          value={mainImg}
          onChange={e => setMainImg(e.target.value)}
          placeholder="Paste image URL"
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Product URL:</label>
        <input
          type="text"
          value={productUrl}
          onChange={e => setProductUrl(e.target.value)}
          placeholder="Paste product URL (optional)"
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>
      <button onClick={handleSave} style={{ padding: '8px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Save</button>
      {success && <div style={{ color: 'green', marginTop: 10 }}>Product updated!</div>}
      <div style={{ marginTop: 16 }}>
        <img src={mainImg} alt="Preview" style={{ width: 200, borderRadius: 8, border: '1px solid #eee' }} onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/200x150?text=No+Image'; }} />
      </div>
      {productUrl && (
        <div style={{ marginTop: 10 }}>
          <a href={productUrl} target="_blank" rel="noopener noreferrer">View Product URL</a>
        </div>
      )}
      <Link to={`/admin/edit-product/${product._id}`}>Edit Image</Link>
    </div>
  );
}

export default EditProduct; 