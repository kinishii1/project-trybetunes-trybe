function MusicCard({ trackName, previewUrl } : any) {
  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>
    </div>
  );
}

export default MusicCard;
