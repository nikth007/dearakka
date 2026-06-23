import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const NAV = [
  { to: '/app/dashboard', label: 'Dashboard', icon: '○' },
  { to: '/app/log',       label: 'Log Today',  icon: '＋' },
  { to: '/app/history',   label: 'History',    icon: '▦' },
  { to: '/app/settings',  label: 'Settings',   icon: '⚙' },
];

export default function AppShell() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  function handleSignout() {
    signout();
    navigate('/');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--canvas)' }}>
      {/* Sidebar — desktop */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: '#fff', borderRight: '1px solid var(--line)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        zIndex: 10,
      }} className="app-sidebar">
        <div style={{ padding: '28px 24px 20px' }}>
          <NavLink to="/"><Logo size={20} /></NavLink>
        </div>

        <nav style={{ flex: 1, padding: '8px 12px' }}>
          {NAV.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 14px', borderRadius: 12, marginBottom: 4,
              fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: 15,
              color: isActive ? 'var(--teal)' : 'var(--ink-soft)',
              background: isActive ? 'var(--teal-soft)' : 'transparent',
              textDecoration: 'none',
              transition: 'all .15s',
            })}>
              <span style={{ fontSize: 18, lineHeight: 1, opacity: 0.75 }}>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--line)' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'My Account'}</p>
          <p style={{ fontSize: 12, color: 'var(--ink-faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 10 }}>{user?.email}</p>
          <button onClick={handleSignout} style={{ fontSize: 13, color: 'var(--ink-soft)', fontWeight: 600, padding: '6px 0' }}>Sign out</button>
        </div>
      </aside>

      {/* Main content area */}
      <main style={{ flex: 1, marginLeft: 240, minHeight: '100vh', paddingBottom: 80 }} className="app-main">
        <Outlet />
      </main>

      {/* Bottom nav — mobile only */}
      <nav style={{
        display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#fff', borderTop: '1px solid var(--line)', zIndex: 20,
        padding: '8px 0 calc(8px + env(safe-area-inset-bottom))',
      }} className="app-bottom-nav">
        {NAV.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} style={({ isActive }) => ({
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flex: 1,
            color: isActive ? 'var(--teal)' : 'var(--ink-faint)',
            textDecoration: 'none', fontSize: 11, fontWeight: 600,
          })}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .app-sidebar { display: none !important; }
          .app-main { margin-left: 0 !important; }
          .app-bottom-nav { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
