import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { VideoFormat } from "../utils/constants";

export type VideoStore = {
  format: VideoFormat;
  setFormat: (format: VideoFormat) => void;

  url: string;
  setUrl: (url: string) => void;

  video: Video[];
  setVideo: (video: Video[]) => void;

  setAllVideos: (images: Image[]) => void;
  upsertVideo: (video: Video) => void;

  selectedVideo: Video[];
  setSelectedVideo: (video: Video) => void;
};
export const VideoStore = create<VideoStore>()(
  immer<VideoStore>((set, get) => ({
    format: "orginal",
    setFormat: (format) => set((state) => ({ ...state, format })),
    url: "",
    setUrl: (url) => set((state) => ({ ...state, url })),
    video: [],
    setVideo: (video) => set((state) => void (state.video = video)),
    upsertVideo: (test) => {
      const foundVideoIndex = get().video.findIndex((i) => i.url === test.url);
      if (foundVideoIndex !== -1) {
        get().video[foundVideoIndex];
      }
    },
    selectedVideo: [],
    setSelectedVideo: (img) => {
      const foundImage = get().selectedVideo.findIndex(
        (i) => i.url === img.url
      );

      //image found === -1
      if (foundImage !== -1) {
        set((state) => void state.selectedVideo.splice(foundImage, 1));
      } else {
        set((state) => void state.selectedVideo.push(img));
      }
    },
    setAllVideos: (video) => set((state) => void (state.video = video)),
  }))
);
