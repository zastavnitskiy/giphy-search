interface Rendition {
  url?: string;
  webp?: string;
  width: number;
  height: number;
}

interface Gif {
  id: string;
  images: {
    preview: Rendition;
    preview_webp: Rendition;
    fixed_width: Rendition;
  };
  title: string;
}

interface ApiResponse {
  data: Gif[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}
