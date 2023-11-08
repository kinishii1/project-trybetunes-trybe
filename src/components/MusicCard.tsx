import { useEffect, useState } from 'react';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';

function MusicCard({ trackName, previewUrl, trackId, updateFavoriteSongs } : any) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const getFavorite = async () => {
      const favoriteSongs = await getFavoriteSongs();
      const isFavoriteSong = favoriteSongs.some(
        (song: any) => song.trackId === trackId,
      );
      setFavorite(isFavoriteSong);
    };
    getFavorite();
  }, [trackId]);

  console.log(favorite);

  const changeHandler = () => {
    setFavorite(!favorite);
    if (!favorite) {
      addSong({ trackName, previewUrl, trackId });
    } else {
      removeSong(trackId);
      updateFavoriteSongs(trackId);
    }
  };

  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>
      <label
        data-testid={ `checkbox-music-${trackId}` }
        htmlFor={ `favorite-${trackId}` }
      >
        {favorite ? (
          <img src="/src/images/checked_heart.png" alt="favorite" />
        ) : (
          <img src="/src/images/empty_heart.png" alt="favorite" />
        )}
      </label>
      <input
        checked={ favorite }
        type="checkbox"
        name="favorite"
        id={ `favorite-${trackId}` }
        onChange={ changeHandler }
      />
    </div>
  );
}

export default MusicCard;
