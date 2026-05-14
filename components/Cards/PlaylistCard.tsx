import Image from "next/image";
import Link from "next/link";
import { PlaylistCardProps } from "@/types/types";

const PlaylistCard = ({
  id,
  title,
  thumbnailUrl,
  videos,
}: PlaylistCardProps) => {
  return (
    <Link href={`/playlists/${id}`} className="chrome-card playlist-card">
      <div className="playlist-card-thumb">
        <Image src={thumbnailUrl} alt={title} fill className="object-cover" />
        <div className="playlist-card-count">
          <span>{videos}</span>
          <span>videos</span>
        </div>
      </div>
      <div className="playlist-card-info">
        <h3 className="card-title line-clamp-2">{title}</h3>
      </div>
    </Link>
  );
};

export default PlaylistCard;
