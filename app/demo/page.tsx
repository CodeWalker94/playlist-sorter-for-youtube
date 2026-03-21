import VideoCard from "@/components/Cards/VideoCard";
import PlaylistCard from "@/components/Cards/PlaylistCard";

const mockVideos = [
  {
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    channelTitle: "Rick Astley",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: 213,
    views: 1500000000,
    datePosted: "2009-10-25T00:00:00Z",
  },
  {
    id: "9bZkp7q19f0",
    title: "PSY - GANGNAM STYLE (강남스타일) M/V",
    channelTitle: "officialpsy",
    thumbnailUrl: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
    duration: 252,
    views: 5200000000,
    datePosted: "2012-07-15T00:00:00Z",
  },
  {
    id: "kJQP7kiw5Fk",
    title: "Luis Fonsi - Despacito ft. Daddy Yankee",
    channelTitle: "Luis Fonsi",
    thumbnailUrl: "https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
    duration: 282,
    views: 8200000000,
    datePosted: "2017-01-12T00:00:00Z",
  },
];

export default function DemoPage() {
  return (
    <div className="p-8 text-foreground">
      <h1 className="text-2xl font-bold mb-6">VideoCard Preview</h1>
      <div className="grid grid-cols-3 gap-3.5">
        {mockVideos.map((video) => (
          <PlaylistCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
}
