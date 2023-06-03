import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type FacebookStore = {
  videourl: string;
  setUrl: (url: string) => void;
};

export const FacebookStore = create<FacebookStore>()(
  immer<FacebookStore>((set) => ({
    videourl: "",
    setUrl: (url) => set((state) => void (state.videourl = url)),
  }))
);
