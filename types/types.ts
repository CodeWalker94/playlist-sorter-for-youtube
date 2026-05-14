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
  entryId: string;
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  datePosted: string;
}

export interface SavedPlaylist {
  id: string;
  title: string;
  videos: VideoCardProps[];
  createdAt: string;
}

export interface YTVideoItem {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      medium?: { url: string };
    };
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount?: string;
  };
}
