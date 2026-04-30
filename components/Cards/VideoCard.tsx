import React from "react";
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

type VideoCardWithSelectProps = VideoCardProps & {
  isSelectMode?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
};

const VideoCard = ({
  entryId,
  id,
  title,
  channelTitle,
  thumbnailUrl,
  duration,
  views,
  datePosted,
  isSelectMode = false,
  isSelected = false,
  onSelect,
}: VideoCardWithSelectProps): React.ReactElement => {
  const handleClick = (e: React.MouseEvent) => {
    if (isSelectMode && onSelect) {
      e.preventDefault();
      onSelect(entryId);
    }
  };

  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`tile${isSelected ? " tile-selected" : ""}`}
      onClick={handleClick}
    >
      <div className="video-box">
        {isSelectMode && (
          <div
            className={`select-checkbox${isSelected ? " select-checkbox-checked" : ""}`}
          >
            {isSelected && <span>✓</span>}
          </div>
        )}
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
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
