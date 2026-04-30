import VideoCard from "@/components/Cards/VideoCard";
import { VideoCardProps } from "@/types/types";

type VideoListProps = {
  videos: VideoCardProps[];
  isSelectMode?: boolean;
  selectedIds?: Set<string>;
  onSelect?: (id: string) => void;
};

const VideoList = ({
  videos,
  isSelectMode = false,
  selectedIds,
  onSelect,
}: VideoListProps) => {
  return (
    <div className="playlist-grid">
      {videos.length === 0 ? (
        <p className="text-muted">No videos available.</p>
      ) : (
        videos.map((video) => (
          <VideoCard
            key={video.entryId}
            {...video}
            isSelectMode={isSelectMode}
            isSelected={selectedIds?.has(video.entryId) ?? false}
            onSelect={onSelect}
          />
        ))
      )}
    </div>
  );
};

export default VideoList;
