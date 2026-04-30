import VideoCard from "@/components/Cards/VideoCard";
import { VideoCardProps } from "@/types/types";

type VideoListProps = {
  videos: VideoCardProps[];
  query: string;
};

const VideoList = ({ videos, query }: VideoListProps) => {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredVideos = normalizedQuery
    ? videos.filter((video) => {
        const title = video.title.toLowerCase();
        const channel = video.channelTitle.toLowerCase();
        return (
          title.includes(normalizedQuery) || channel.includes(normalizedQuery)
        );
      })
    : videos;

  return (
    <div className="playlist-grid">
      {filteredVideos.length === 0 ? (
        <p className="text-muted">
          {normalizedQuery
            ? `No videos match "${query}".`
            : "No videos available yet."}
        </p>
      ) : (
        filteredVideos.map((video) => <VideoCard key={video.id} {...video} />)
      )}
    </div>
  );
};

export default VideoList;
