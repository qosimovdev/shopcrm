import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Trash2 } from 'lucide-react';
import './AdminLayout.css';

const AdminProducts = () => {
  const { products, deleteProduct, isSuperAdmin } = useContext(AppContext);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>
          Products <span>{products.length} total</span>
        </h1>
        <a href="/admin/add-product" className="admin-btn admin-btn-primary" style={{ textDecoration: 'none' }}>
          + Add Product
        </a>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td><img className="table-img" src={p.image} alt={p.name} /></td>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td style={{ color: '#9ca3af' }}>{p.brand}</td>
                <td style={{ color: '#9ca3af' }}>{p.category}</td>
                <td>
                  <span style={{ color: '#00f0ff', fontWeight: 700 }}>${p.price}</span>
                  {p.oldPrice && (
                    <span style={{ color: '#6b7280', fontSize: '0.8rem', textDecoration: 'line-through', marginLeft: 6 }}>
                      ${p.oldPrice}
                    </span>
                  )}
                </td>
                <td style={{ color: '#fbbf24' }}>⭐ {p.rating}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {p.isNew && <span className="badge-pill badge-new">New</span>}
                    {p.oldPrice && <span className="badge-pill badge-sale">Sale</span>}
                  </div>
                </td>
                <td>
                  {isSuperAdmin ? (
                    <button
                      className="admin-btn admin-btn-danger"
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      onClick={() => deleteProduct(p.id)}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>🔒 SuperAdmin Only</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
