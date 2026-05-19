// Navbar - Top navigation bar with search and user profile
function Navbar() {
  return (
    <nav style={{ background: '#121212', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <button style={{ background: 'white', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: '18px' }}>‹</button>
        <button style={{ background: 'white', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: '18px' }}>›</button>
      </div>
      <div style={{ background: '#242424', borderRadius: '24px', padding: '8px 16px', color: 'white' }}>
        🔍 Search
      </div>
      <div style={{ background: '#1DB954', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
        U
      </div>
    </nav>
  );
}

export default Navbar;