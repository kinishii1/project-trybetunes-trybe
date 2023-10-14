import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { SongType } from '../types';
import MusicCard from '../components/MusicCard';

function Favorites() {
  const [loading, setLoading] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);

  useEffect(() => {
    setLoading(true);
    const getFavorite = async () => {
      const returnedFavoriteSongs = await getFavoriteSongs();
      setFavoriteSongs(returnedFavoriteSongs);
      setLoading(false);
    };
    getFavorite();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Musicas favoritas:</h1>
      <div>
        {favoriteSongs.map((song: any) => (
          <MusicCard
            key={ song.trackId }
            { ...song }
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
