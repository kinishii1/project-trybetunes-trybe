import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { SongType } from '../types';
import MusicCard from '../components/MusicCard';

function Favorites() {
  const [loading, setLoading] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);

  const updateFavoriteSongs = (songId: string) => {
    const newFavoriteSongs = favoriteSongs.filter(
      (song: any) => song.trackId !== songId,
    );
    setFavoriteSongs(newFavoriteSongs);
  };

  useEffect(() => {
    const getFavoriteSongsFromAPI = async () => {
      setLoading(true);
      const returnedFavoriteSongs = await getFavoriteSongs();
      setFavoriteSongs(returnedFavoriteSongs);
      setLoading(false);
    };
    getFavoriteSongsFromAPI();
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
            updateFavoriteSongs={ updateFavoriteSongs }
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
