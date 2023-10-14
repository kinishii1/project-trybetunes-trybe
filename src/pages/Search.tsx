import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';

function Search() {
  const [search, setSearch] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setIsDisabled(event.target.value.length < 2);
  };

  const clickHandler = async () => {
    setIsLoading(true);
    const albumsReturn = await searchAlbumsAPI(search);
    console.log(albumsReturn);
    setAlbums(albumsReturn);
    setSearchInput(search);
    setSearch('');
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <input
          data-testid="search-artist-input"
          type="text"
          value={ search }
          onChange={ (e) => changeHandler(e) }
        />
        <button
          disabled={ isDisabled }
          data-testid="search-artist-button"
          onClick={ clickHandler }
        >
          Pesquisar
        </button>
      </div>
      {isLoading && <p>Carregando...</p>}
      {albums.length > 0 ? (
        <div>
          <h1>
            Resultado de álbuns de:
            {' '}
            {searchInput}
          </h1>
          <div>
            {albums.map((album: any) => (
              <div key={ album.collectionId }>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <p>{album.collectionName}</p>
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  {' '}
                  Ir para album
                  {' '}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2>Nenhum álbum foi encontrado </h2>
      )}
    </>
  );
}

export default Search;
