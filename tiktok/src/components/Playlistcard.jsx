// PlaylistCard - Reusable card component for albums/playlists
function PlaylistCard({ title, artist, cover }) {
  return (
    <div style={{ background: '#181818', borderRadius: '8px', padding: '16px', cursor: 'pointer', transition: 'background 0.3s', width: '160px' }}
      onMouseEnter={e => e.currentTarget.style.background = '#282828'}
      onMouseLeave={e => e.currentTarget.style.background = '#181818'}>
      <img src={cover} alt={title} style={{ width: '100%', borderRadius: '4px', marginBottom: '12px' }} />
      <p style={{ fontWeight: 'bold', fontSize: '14px' }}>{title}</p>
      <p style={{ color: '#b3b3b3', fontSize: '12px', marginTop: '4px' }}>{artist}</p>
    </div>
  );
}

export default PlaylistCard;