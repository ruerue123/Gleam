import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Modal, { ModalButton } from '../../components/Modal';
import { useModal } from '../../hooks/useModal';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { token } = useAuth();
  const modal = useModal();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Form state for new/edit product
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    scentFamily: 'EMBER',
    price: '',
    countInStock: '',
    scent: '',
    burnTime: '',
    size: '',
    colors: [''],
    images: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Collection names that match backend enum values
  const scentFamilies = ['EMBER', 'ZEST', 'SERENE', 'ROOT', 'DESERT', 'MOLDED'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data.data || []);

      // Log existing collections to help debug
      if (data.data && data.data.length > 0) {
        const existingCollections = [...new Set(data.data.map(p => p.collection))];
        console.log('Existing valid collections:', existingCollections);
        console.log('Sample product structure:', data.data[0]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from name
      ...(name === 'name' && { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })
    }));
  };

  const handleColorChange = (index, value) => {
    const newColors = [...formData.colors];
    newColors[index] = value;
    setFormData(prev => ({ ...prev, colors: newColors }));
  };

  const addColorField = () => {
    setFormData(prev => ({ ...prev, colors: [...prev.colors, ''] }));
  };

  const removeColorField = (index) => {
    setFormData(prev => ({ ...prev, colors: prev.colors.filter((_, i) => i !== index) }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      modal.alert('Please select an image file', 'Invalid File Type', 'error');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      modal.alert('Image size must be less than 5MB', 'File Too Large', 'error');
      return;
    }

    setUploadingImage(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const response = await fetch(`${API_URL}/api/upload/single`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      });

      if (response.ok) {
        const data = await response.json();

        // Add uploaded image URL to form data
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, data.url]
        }));

        // Add to preview
        setImagePreviews(prev => [...prev, data.url]);
      } else {
        const errorData = await response.json();
        modal.alert(`Upload failed: ${errorData.message || 'Unknown error'}`, 'Upload Error', 'error');
      }
    } catch (error) {
      console.error('Upload error:', error);
      modal.alert('Failed to upload image. Please try again.', 'Upload Error', 'error');
    } finally {
      setUploadingImage(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      scentFamily: 'EMBER',
      price: '',
      countInStock: '',
      scent: '',
      burnTime: '',
      size: '',
      colors: [''],
      images: []
    });
    setImagePreviews([]);
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.countInStock),
      colors: formData.colors.filter(c => c.trim() !== ''),
      // Images are already in formData.images from the URL input
      images: formData.images,
      // Backend requires collection and collectionSlug fields
      collection: formData.scentFamily,
      collectionSlug: formData.scentFamily.toLowerCase(),
      // Also set scentFamily to match collection
      scentFamily: formData.scentFamily
    };

    try {
      const url = editingProduct
        ? `${API_URL}/api/products/${editingProduct}`
        : `${API_URL}/api/products`;

      const method = editingProduct ? 'PUT' : 'POST';

      console.log('Submitting product data:', productData);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        fetchProducts();
        setShowAddModal(false);
        resetForm();
      } else {
        const errorData = await response.json();
        console.error('Server error:', response.status, errorData);
        modal.alert(`Error: ${errorData.message || 'Failed to save product'}`, 'Save Error', 'error');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      modal.alert('Failed to save product. Please try again.', 'Save Error', 'error');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name || '',
      slug: product.slug || '',
      description: product.description || '',
      scentFamily: product.scentFamily || product.collection || 'EMBER',
      price: product.price || '',
      countInStock: product.countInStock || product.stock || '',
      scent: product.scent || '',
      burnTime: product.burnTime || '',
      size: product.size || '',
      colors: product.colors && product.colors.length > 0 ? product.colors : [''],
      images: product.images || []
    });

    // Set existing images as previews
    if (product.images && product.images.length > 0) {
      setImagePreviews(product.images);
    }

    setEditingProduct(product._id);
    setShowAddModal(true);
  };

  const handleDelete = async (productId) => {
    const confirmed = await modal.confirm(
      'Delete Product',
      'Are you sure you want to delete this product? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchProducts();
        modal.alert('Product deleted successfully', 'Success', 'success');
      } else {
        modal.alert('Failed to delete product', 'Error', 'error');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      modal.alert('Failed to delete product. Please try again.', 'Error', 'error');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', fontFamily: "'Cormorant', serif", fontSize: '1.2rem', color: '#8B7355' }}>
        Loading products...
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '0.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Cardo', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#171515', margin: '0 0 0.5rem 0' }}>
            Products
          </h1>
          <p style={{ fontFamily: "'Cormorant', serif", fontSize: '1rem', color: '#8B7355', margin: 0 }}>
            Manage your candle collection
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#8B7355',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontFamily: "'Cormorant', serif",
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 2px 8px rgba(139, 115, 85, 0.2)'
          }}
        >
          <span>+</span> Add New Product
        </motion.button>
      </div>

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#fff',
              borderRadius: '8px',
              border: '1px solid #EDECE4',
              overflow: 'hidden',
              transition: 'box-shadow 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
          >
            {/* Product Image */}
            <div style={{
              height: '200px',
              background: 'linear-gradient(to bottom, #EDECE4 0%, #D8D6CE 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              ) : (
                <div style={{ fontSize: '4rem' }}>🕯️</div>
              )}

              {/* Stock Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontFamily: "'Cormorant', serif",
                fontWeight: 500,
                background: (product.stock || product.countInStock || 0) > 0 ? '#D4EDDA' : '#F8D7DA',
                color: (product.stock || product.countInStock || 0) > 0 ? '#155724' : '#721C24'
              }}>
                {(product.stock || product.countInStock || 0) > 0 ? `${product.stock || product.countInStock} in stock` : 'Out of stock'}
              </div>
            </div>

            {/* Product Info */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                fontSize: '0.75rem',
                fontFamily: "'Cormorant', serif",
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#8B7355',
                marginBottom: '0.5rem',
                fontWeight: 500
              }}>
                {product.scentFamily || 'No Family'}
              </div>

              <h3 style={{
                fontFamily: "'Cardo', serif",
                fontSize: '1.25rem',
                color: '#171515',
                margin: '0 0 0.5rem 0',
                fontWeight: 400
              }}>
                {product.name}
              </h3>

              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: '0.95rem',
                color: '#171515',
                opacity: 0.7,
                margin: '0 0 1rem 0',
                lineHeight: 1.5,
                fontStyle: 'italic'
              }}>
                {product.description}
              </p>

              {product.scent && (
                <div style={{
                  fontSize: '0.9rem',
                  fontFamily: "'Cormorant', serif",
                  color: '#171515',
                  opacity: 0.8,
                  marginBottom: '0.5rem'
                }}>
                  Scent: {product.scent}
                </div>
              )}

              {product.burnTime && (
                <div style={{
                  fontSize: '0.9rem',
                  fontFamily: "'Cormorant', serif",
                  color: '#171515',
                  opacity: 0.8,
                  marginBottom: '0.5rem'
                }}>
                  Burn Time: {product.burnTime}
                </div>
              )}

              {product.size && (
                <div style={{
                  fontSize: '0.9rem',
                  fontFamily: "'Cormorant', serif",
                  color: '#171515',
                  opacity: 0.8,
                  marginBottom: '0.5rem'
                }}>
                  Size: {product.size}
                </div>
              )}

              <div style={{
                fontFamily: "'Cardo', serif",
                fontSize: '1.5rem',
                color: '#171515',
                fontWeight: 500,
                marginBottom: '1rem',
                marginTop: '1rem'
              }}>
                ${product.price.toFixed(2)}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleEdit(product)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#8B7355',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontFamily: "'Cormorant', serif",
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#6F5943'}
                  onMouseLeave={(e) => e.target.style.background = '#8B7355'}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'transparent',
                    color: '#C53030',
                    border: '1px solid #C53030',
                    borderRadius: '4px',
                    fontFamily: "'Cormorant', serif",
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#C53030';
                    e.target.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#C53030';
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowAddModal(false);
              resetForm();
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#fff',
                borderRadius: '8px',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Modal Header */}
              <div style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid #EDECE4',
                flexShrink: 0,
                background: '#fff',
                zIndex: 1
              }}>
                <h2 style={{
                  fontFamily: "'Cardo', serif",
                  fontSize: '1.8rem',
                  color: '#171515',
                  margin: 0
                }}>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {/* Product Name */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: "'Cormorant', serif",
                      fontSize: '1rem',
                      color: '#171515',
                      marginBottom: '0.5rem',
                      fontWeight: 500
                    }}>
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Lavender Dreams"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #EDECE4',
                        borderRadius: '4px',
                        fontFamily: "'Cormorant', serif",
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#8B7355'}
                      onBlur={(e) => e.target.style.borderColor = '#EDECE4'}
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: "'Cormorant', serif",
                      fontSize: '1rem',
                      color: '#171515',
                      marginBottom: '0.5rem',
                      fontWeight: 500
                    }}>
                      Slug (auto-generated)
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="lavender-dreams"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #EDECE4',
                        borderRadius: '4px',
                        fontFamily: "'Cormorant', serif",
                        fontSize: '1rem',
                        background: '#FAFAF8'
                      }}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: "'Cormorant', serif",
                      fontSize: '1rem',
                      color: '#171515',
                      marginBottom: '0.5rem',
                      fontWeight: 500
                    }}>
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      placeholder="A soothing blend of lavender and vanilla..."
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #EDECE4',
                        borderRadius: '4px',
                        fontFamily: "'Cormorant', serif",
                        fontSize: '1rem',
                        outline: 'none',
                        resize: 'vertical',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#8B7355'}
                      onBlur={(e) => e.target.style.borderColor = '#EDECE4'}
                    />
                  </div>

                  {/* Scent Family */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: "'Cormorant', serif",
                      fontSize: '1rem',
                      color: '#171515',
                      marginBottom: '0.5rem',
                      fontWeight: 500
                    }}>
                      Scent Family *
                    </label>
                    <select
                      name="scentFamily"
                      value={formData.scentFamily}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #EDECE4',
                        borderRadius: '4px',
                        fontFamily: "'Cormorant', serif",
                        fontSize: '1rem',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {scentFamilies.map(family => (
                        <option key={family} value={family}>{family}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price and Stock */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: "'Cormorant', serif",
                        fontSize: '1rem',
                        color: '#171515',
                        marginBottom: '0.5rem',
                        fontWeight: 500
                      }}>
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        step="0.01"
                        min="0"
                        placeholder="28.99"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #EDECE4',
                          borderRadius: '4px',
                          fontFamily: "'Cormorant', serif",
                          fontSize: '1rem',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#8B7355'}
                        onBlur={(e) => e.target.style.borderColor = '#EDECE4'}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: "'Cormorant', serif",
                        fontSize: '1rem',
                        color: '#171515',
                        marginBottom: '0.5rem',
                        fontWeight: 500
                      }}>
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        name="countInStock"
                        value={formData.countInStock}
                        onChange={handleInputChange}
                        required
                        min="0"
                        placeholder="50"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #EDECE4',
                          borderRadius: '4px',
                          fontFamily: "'Cormorant', serif",
                          fontSize: '1rem',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#8B7355'}
                        onBlur={(e) => e.target.style.borderColor = '#EDECE4'}
                      />
                    </div>
                  </div>

                  {/* Scent, Burn Time, and Size */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: "'Cormorant', serif",
                        fontSize: '1rem',
                        color: '#171515',
                        marginBottom: '0.5rem',
                        fontWeight: 500
                      }}>
                        Scent Notes
                      </label>
                      <input
                        type="text"
                        name="scent"
                        value={formData.scent}
                        onChange={handleInputChange}
                        placeholder="Lavender, Vanilla"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #EDECE4',
                          borderRadius: '4px',
                          fontFamily: "'Cormorant', serif",
                          fontSize: '1rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: "'Cormorant', serif",
                        fontSize: '1rem',
                        color: '#171515',
                        marginBottom: '0.5rem',
                        fontWeight: 500
                      }}>
                        Burn Time
                      </label>
                      <input
                        type="text"
                        name="burnTime"
                        value={formData.burnTime}
                        onChange={handleInputChange}
                        placeholder="40-50 hours"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #EDECE4',
                          borderRadius: '4px',
                          fontFamily: "'Cormorant', serif",
                          fontSize: '1rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: "'Cormorant', serif",
                        fontSize: '1rem',
                        color: '#171515',
                        marginBottom: '0.5rem',
                        fontWeight: 500
                      }}>
                        Size
                      </label>
                      <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        placeholder="8 oz"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #EDECE4',
                          borderRadius: '4px',
                          fontFamily: "'Cormorant', serif",
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label style={{
                        fontFamily: "'Cormorant', serif",
                        fontSize: '1rem',
                        color: '#171515',
                        fontWeight: 500
                      }}>
                        Available Colors
                      </label>
                      <button
                        type="button"
                        onClick={addColorField}
                        style={{
                          padding: '0.25rem 0.75rem',
                          background: '#8B7355',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          fontFamily: "'Cormorant', serif",
                          fontSize: '0.9rem',
                          cursor: 'pointer'
                        }}
                      >
                        + Add Color
                      </button>
                    </div>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                      {formData.colors.map((color, index) => (
                        <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                          <input
                            type="text"
                            value={color}
                            onChange={(e) => handleColorChange(index, e.target.value)}
                            placeholder={`Color ${index + 1}`}
                            style={{
                              flex: 1,
                              padding: '0.75rem',
                              border: '1px solid #EDECE4',
                              borderRadius: '4px',
                              fontFamily: "'Cormorant', serif",
                              fontSize: '1rem'
                            }}
                          />
                          {formData.colors.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeColorField(index)}
                              style={{
                                padding: '0.75rem',
                                background: 'transparent',
                                color: '#C53030',
                                border: '1px solid #C53030',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                minWidth: '40px'
                              }}
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: "'Cormorant', serif",
                      fontSize: '1rem',
                      color: '#171515',
                      marginBottom: '0.5rem',
                      fontWeight: 500
                    }}>
                      Product Images
                    </label>

                    <div style={{ marginBottom: '1rem' }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        style={{ display: 'none' }}
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        style={{
                          display: 'inline-block',
                          padding: '0.75rem 1.5rem',
                          background: uploadingImage ? '#ccc' : '#8B7355',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          fontFamily: "'Cormorant', serif",
                          fontSize: '1rem',
                          fontWeight: 500,
                          cursor: uploadingImage ? 'not-allowed' : 'pointer',
                          transition: 'background 0.2s'
                        }}
                      >
                        {uploadingImage ? 'Uploading...' : '+ Upload Image'}
                      </label>
                      <p style={{
                        fontFamily: "'Cormorant', serif",
                        fontSize: '0.85rem',
                        color: '#8B7355',
                        margin: '0.5rem 0 0 0',
                        opacity: 0.8
                      }}>
                        Max 5MB • JPG, PNG, WEBP
                      </p>
                    </div>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                        gap: '0.75rem',
                        marginBottom: '1rem'
                      }}>
                        {imagePreviews.map((preview, index) => (
                          <div key={index} style={{ position: 'relative' }}>
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              loading="lazy"
                              decoding="async"
                              style={{
                                width: '100%',
                                height: '100px',
                                objectFit: 'cover',
                                borderRadius: '4px',
                                border: '1px solid #EDECE4'
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              style={{
                                position: 'absolute',
                                top: '0.25rem',
                                right: '0.25rem',
                                background: '#C53030',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Footer */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid #EDECE4'
                }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'transparent',
                      color: '#171515',
                      border: '1px solid #EDECE4',
                      borderRadius: '4px',
                      fontFamily: "'Cormorant', serif",
                      fontSize: '1rem',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: '#8B7355',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontFamily: "'Cormorant', serif",
                      fontSize: '1rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#6F5943';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#8B7355';
                    }}
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessible Modal for alerts and confirmations */}
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.hideModal}
        title={modal.modalConfig.title}
        message={modal.modalConfig.message}
        type={modal.modalConfig.type}
        actions={
          modal.modalConfig.onConfirm && modal.modalConfig.onCancel ? (
            <>
              <ModalButton variant="secondary" onClick={modal.modalConfig.onCancel}>
                Cancel
              </ModalButton>
              <ModalButton variant="primary" onClick={modal.modalConfig.onConfirm} autoFocus>
                Confirm
              </ModalButton>
            </>
          ) : (
            <ModalButton variant="primary" onClick={modal.hideModal} autoFocus>
              OK
            </ModalButton>
          )
        }
      />
    </div>
  );
}

export default AdminProducts;
