import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { Plus, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminAddProduct = () => {
  const { categories, addProduct } = useContext(AppContext);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    brand: '',
    price: '',
    oldPrice: '',
    image: '',
    category: '',
    isNew: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({
      ...form,
      price: parseFloat(form.price),
      oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : null,
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate('/admin/products');
    }, 2000);
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div>
      <h1 className="admin-page-title">Add Watch <span>New item to catalog</span></h1>

      {success && (
        <div style={{
          background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
          borderRadius: 12, padding: '16px 20px', marginBottom: 24,
          color: '#22c55e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10
        }}>
          <CheckCircle size={20} />
          Watch added! It will now appear in the collection. Redirecting...
        </div>
      )}

      <div className="admin-card">
        <form className="admin-form" style={{ maxWidth: '100%' }} onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <div className="form-field">
              <label>Watch Name *</label>
              <input className="admin-input" type="text" placeholder="Seamaster Pro" value={form.name} onChange={set('name')} required />
            </div>
            <div className="form-field">
              <label>Brand *</label>
              <input className="admin-input" type="text" placeholder="Omega" value={form.brand} onChange={set('brand')} required />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="form-field">
              <label>Price ($) *</label>
              <input className="admin-input" type="number" placeholder="1299" value={form.price} onChange={set('price')} required />
            </div>
            <div className="form-field">
              <label>Old Price ($) <span style={{ color: '#6b7280', textTransform: 'none' }}>(optional, for sale)</span></label>
              <input className="admin-input" type="number" placeholder="1599" value={form.oldPrice} onChange={set('oldPrice')} />
            </div>
          </div>

          <div className="form-field">
            <label>Image URL *</label>
            <input className="admin-input" type="url" placeholder="https://images.unsplash.com/..." value={form.image} onChange={set('image')} required />
            {form.image && (
              <img src={form.image} alt="preview" style={{ marginTop: 10, width: 120, height: 100, objectFit: 'cover', borderRadius: 8 }} />
            )}
          </div>

          <div className="admin-form-row">
            <div className="form-field">
              <label>Category *</label>
              <select className="admin-input" value={form.category} onChange={set('category')} required>
                <option value="">Select category...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label>Mark as New</label>
              <select className="admin-input" value={form.isNew} onChange={e => setForm({ ...form, isNew: e.target.value === 'true' })}>
                <option value="true">✅ Yes - Show in New Arrivals</option>
                <option value="false">❌ No</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              <Plus size={16} /> Add Watch
            </button>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => navigate('/admin/products')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
