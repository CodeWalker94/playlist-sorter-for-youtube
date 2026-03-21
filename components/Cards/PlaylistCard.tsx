interface PlaylistCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  videos: number;
}

const PlaylistCard = ({
  id,
  title,
  thumbnailUrl,
  videos,
}: PlaylistCardProps): JSX.Element => {
  return (
    <a href={`/playlist?list=${id}`} className="card playlist-card">
      <div className="playlist-card-thumb">
        <img src={thumbnailUrl} alt={title} />
        <div className="playlist-card-count">
          <span>{videos}</span>
          <span>videos</span>
        </div>
      </div>
      <div className="playlist-card-info">
        <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
      </div>
    </a>
  );
};

export default PlaylistCard;
