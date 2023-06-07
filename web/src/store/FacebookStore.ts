import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type FacebookStore = {
  selectedUrl: string;
  setSelectedUrl: (url: string) => void;
};

export const FacebookStore = create<FacebookStore>()(
  immer<FacebookStore>((set) => ({
    selectedUrl: "",
    setSelectedUrl: (url) => set((state) => void (state.selectedUrl = url)),
  }))
);
