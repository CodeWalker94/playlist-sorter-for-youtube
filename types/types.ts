export interface PlaylistCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  videos: number;
}

export interface YTPlaylistItem {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      medium?: { url: string };
    };
  };
  contentDetails: {
    itemCount: number;
  };
}

export interface VideoCardProps {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  datePosted: string;
}
