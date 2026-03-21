import { formatViews, formatRelativeDate } from "@/lib/formatters";

interface VideoCardProps {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  datePosted: string;
}

const durationFormatter = (seconds: number): string => {
  const minute = Math.floor(seconds / 60);
  const second = seconds % 60;
  return `${minute}:${second.toString().padStart(2, "0")}`;
};

const VideoCard = ({
  id,
  title,
  channelTitle,
  thumbnailUrl,
  duration,
  views,
  datePosted,
}: VideoCardProps): JSX.Element => {
  return (
    <a href={`/watch?v=${id}`} className="tile">
      <div className="video-box">
        <img src={thumbnailUrl} alt={title} className="thumbnail w-40 h-24" />
        <span className="duration-badge">{durationFormatter(duration)}</span>
      </div>
      <div className="info-box">
        <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
        <p className="muted">{channelTitle}</p>
        <span className="muted">{formatViews(views)} views</span>
        <span className="muted">{formatRelativeDate(datePosted)}</span>
      </div>
    </a>
  );
};

export default VideoCard;
