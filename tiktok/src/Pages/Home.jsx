import PlaylistCard from '../components/Playlistcard';

// Sample data - data source for reusable PlaylistCard components
const songs = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", cover: "https://picsum.photos/seed/1/160" },
  { id: 2, title: "Shape of You", artist: "Ed Sheeran", cover: "https://picsum.photos/seed/2/160" },
  { id: 3, title: "Levitating", artist: "Dua Lipa", cover: "https://picsum.photos/seed/3/160" },
  { id: 4, title: "Stay", artist: "Kid Laroi", cover: "https://picsum.photos/seed/4/160" },
  { id: 5, title: "Peaches", artist: "Justin Bieber", cover: "https://picsum.photos/seed/5/160" },
];

function Home() {
  return (
    <main style={{ flex: 1, overflowY: 'auto', padding: '24px', background: 'linear-gradient(#1a1a2e, #121212)' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>Good Evening 👋</h2>

      {/* Recently Played Section */}
      <h3 style={{ marginBottom: '16px', color: '#fff' }}>Recently Played</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {songs.map(song => (
          <PlaylistCard key={song.id} title={song.title} artist={song.artist} cover={song.cover} />
        ))}
      </div>

      {/* Recommended Section */}
      <h3 style={{ marginBottom: '16px' }}>Recommended For You</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {songs.slice(0, 3).map(song => (
          <PlaylistCard key={song.id} title={song.title} artist={song.artist} cover={song.cover} />
        ))}
      </div>
    </main>
  );
}

export default Home;