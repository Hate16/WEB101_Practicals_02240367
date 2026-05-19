// Sidebar - Left navigation with Home, Search, Library links
function Sidebar() {
  return (
    <aside style={{ width: '240px', background: '#000', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Logo */}
      <div style={{ color: '#1DB954', fontSize: '24px', fontWeight: 'bold' }}>🎵 Spotify</div>

      {/* Main Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🏠 Home</a>
        <a href="#" style={{ color: '#b3b3b3', textDecoration: 'none' }}>🔍 Search</a>
        <a href="#" style={{ color: '#b3b3b3', textDecoration: 'none' }}>📚 Your Library</a>
      </nav>

      {/* Playlists */}
      <div>
        <p style={{ color: '#b3b3b3', fontSize: '12px', marginBottom: '12px' }}>PLAYLISTS</p>
        {['Chill Vibes', 'Top Hits', 'Workout Mix', 'Late Night'].map(name => (
          <p key={name} style={{ color: '#b3b3b3', padding: '6px 0', cursor: 'pointer' }}>{name}</p>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;