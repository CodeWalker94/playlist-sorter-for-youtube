import Image from "next/image";
import { formatViews, formatRelativeDate } from "@/lib/formatters";
import { VideoCardProps } from "@/types/types";

const durationFormatter = (seconds: number): string => {
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;

  if (hour > 0) {
    return `${hour}:${minute.toString().padStart(2, "0")}:${second
      .toString()
      .padStart(2, "0")}`;
  }

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
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="tile"
    >
      <div className="video-box">
        <Image
          src={thumbnailUrl}
          alt={title}
          width={160}
          height={96}
          className="thumbnail thumbnail-small"
        />
        <span className="duration-badge">{durationFormatter(duration)}</span>
      </div>
      <div className="info-box">
        <h3 className="card-title line-clamp-2">{title}</h3>
        <p className="muted">{channelTitle}</p>
        <span className="muted">{formatViews(views)} views</span>
        <span className="muted">{formatRelativeDate(datePosted)}</span>
      </div>
    </a>
  );
};

export default VideoCard;
