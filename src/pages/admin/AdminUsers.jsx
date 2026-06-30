import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { Trash2, ShieldCheck, ShieldOff, Search, Crown, Lock } from 'lucide-react';
import './AdminLayout.css';

const AdminUsers = () => {
  const { users, currentUser, deleteUser, toggleUserRole, isSuperAdmin } = useContext(AppContext);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleBadge = (role) => {
    switch (role) {
      case 'superadmin':
        return {
          label: '👑 Super Admin',
          bg: 'rgba(212,175,55,0.12)',
          color: '#d4af37',
          border: 'rgba(212,175,55,0.3)',
        };
      case 'admin':
        return {
          label: '🔧 Admin',
          bg: 'rgba(0,240,255,0.12)',
          color: '#00f0ff',
          border: 'rgba(0,240,255,0.3)',
        };
      default:
        return {
          label: '👤 User',
          bg: 'rgba(255,255,255,0.06)',
          color: '#9ca3af',
          border: 'rgba(255,255,255,0.08)',
        };
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>
          Users <span>{users.length} registered</span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '8px 14px' }}>
          <Search size={16} color="#6b7280" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '0.9rem', width: 180 }}
          />
        </div>
      </div>

      {/* Info banner for non-superadmin */}
      {!isSuperAdmin && (
        <div style={{
          background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: 12, padding: '14px 20px', marginBottom: 24,
          color: '#d4af37', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 10
        }}>
          <Lock size={16} />
          Only Super Admin can add or remove admin roles. You can view users but cannot modify roles.
        </div>
      )}

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => {
              const isSelf = user.id === currentUser?.id;
              const isUserSuperAdmin = user.role === 'superadmin';
              const badge = getRoleBadge(user.role);
              return (
                <tr key={user.id}>
                  <td>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', background: '#1a1a2e' }}
                    />
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>
                      {user.name}
                      {isSelf && <span style={{ fontSize: '0.72rem', color: '#00f0ff', marginLeft: 8, fontWeight: 400 }}>(you)</span>}
                    </div>
                  </td>
                  <td style={{ color: '#9ca3af' }}>{user.email}</td>
                  <td>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        background: badge.bg,
                        color: badge.color,
                        border: `1px solid ${badge.border}`,
                      }}
                    >
                      {badge.label}
                    </span>
                  </td>
                  <td style={{ color: '#6b7280', fontSize: '0.85rem' }}>{user.joinedAt}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {/* Only SuperAdmin can toggle roles, and can't change superadmin users */}
                      {isSuperAdmin && !isUserSuperAdmin && (
                        <button
                          className={`admin-btn ${user.role === 'admin' ? 'admin-btn-ghost' : 'admin-btn-primary'}`}
                          style={{ padding: '7px 16px', fontSize: '0.85rem', gap: 6, fontWeight: 700 }}
                          onClick={() => toggleUserRole(user.id)}
                          title={user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                        >
                          {user.role === 'admin' ? 'Revoke Admin Role' : 'Make Admin'}
                        </button>
                      )}
                      {/* Can't delete yourself or superadmin */}
                      {!isSelf && !isUserSuperAdmin && (
                        <button
                          className="admin-btn admin-btn-danger"
                          style={{ padding: '7px 12px', fontSize: '0.8rem' }}
                          onClick={() => deleteUser(user.id)}
                          title="Delete User"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                      {isUserSuperAdmin && !isSelf && (
                        <span style={{ color: '#6b7280', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Crown size={14} color="#d4af37" /> Protected
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
                  No users found matching "{search}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
