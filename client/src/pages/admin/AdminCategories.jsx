import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { Trash2, Plus } from 'lucide-react';
import './AdminLayout.css';

const COLORS = ['#d4af37', '#00f0ff', '#a855f7', '#22c55e', '#eab308', '#ef4444', '#3b82f6', '#ec4899'];
const ICONS = ['⌚', '💎', '⚡', '🕰️', '🏆', '🌟', '🔥', '⭐', '🎯', '👑'];

const AdminCategories = () => {
  const { categories, addCategory, deleteCategory } = useContext(AppContext);
  const [form, setForm] = useState({ name: '', icon: '⌚', color: '#d4af37' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addCategory(form);
    setForm({ name: '', icon: '⌚', color: '#d4af37' });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div>
      <h1 className="admin-page-title">Categories <span>{categories.length} total</span></h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
        {/* Add Category Form */}
        <div className="admin-card">
          <h2 style={{ marginBottom: 24, fontSize: '1.1rem' }}>Add New Category</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Category Name</label>
              <input
                className="admin-input"
                type="text"
                placeholder="e.g. Luxury"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="form-field">
              <label>Choose Icon</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ICONS.map(icon => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setForm({ ...form, icon })}
                    style={{
                      width: 40, height: 40, borderRadius: 8, border: '2px solid',
                      borderColor: form.icon === icon ? '#d4af37' : 'rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)', fontSize: '1.2rem', cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label>Choose Color</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setForm({ ...form, color })}
                    style={{
                      width: 32, height: 32, borderRadius: '50%', background: color,
                      border: '3px solid', borderColor: form.color === color ? '#fff' : 'transparent',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  />
                ))}
              </div>
            </div>

            <button type="submit" className="admin-btn admin-btn-primary">
              <Plus size={16} /> Add Category
            </button>

            {success && (
              <div style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.9rem' }}>
                ✓ Category added successfully!
              </div>
            )}
          </form>
        </div>

        {/* Categories List */}
        <div className="admin-card">
          <h2 style={{ marginBottom: 24, fontSize: '1.1rem' }}>All Categories</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {categories.map(cat => (
              <div
                key={cat.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 16px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
                  background: `${cat.color}20`, border: `1px solid ${cat.color}50`
                }}>
                  {cat.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{cat.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                    ID: {cat.id}
                  </div>
                </div>
                <div style={{
                  width: 12, height: 12, borderRadius: '50%', background: cat.color,
                  boxShadow: `0 0 8px ${cat.color}`
                }} />
                <button
                  className="admin-btn admin-btn-danger"
                  style={{ padding: '6px 10px' }}
                  onClick={() => deleteCategory(cat.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
