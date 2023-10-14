import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { AlbumType } from '../types';

function Album() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [musics, setMusics] = useState<AlbumType[]>([]);

  useEffect(() => {
    const fechtMusics = async () => {
      setIsLoading(true);
      if (!id) {
        return;
      }
      const musicsReturned = (await getMusics(id)) as AlbumType[];
      setIsLoading(false);
      setMusics(musicsReturned);
    };
    fechtMusics();
  }, [id]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (musics.length > 0) {
    return (
      <div>
        <h1 data-testid="artist-name">{musics[0].artistName}</h1>
        <h2 data-testid="album-name">{musics[0].collectionName}</h2>
        {musics.slice(1).map((music: any) => (
          <MusicCard
            key={ music.trackId }
            { ...music }
          />
        ))}
      </div>
    );
  }
}

export default Album;
