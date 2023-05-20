import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type VideoStore = {
  video: Video[];
  setVideo: (video: Video[]) => void;
}

export const VideoStore = create<VideoStore>()(
  immer<VideoStore>((set) => ({
    video: [],
    setVideo: (video) => set((state) => void (state.video = video)),
  }))
);
