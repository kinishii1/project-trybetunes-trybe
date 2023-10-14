import { useState } from 'react';

function MusicCard({ trackName, previewUrl, trackId }: any) {
  const [favorite, setFavorite] = useState(false);

  const changeHandler = () => {
    setFavorite(!favorite);
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
