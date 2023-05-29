import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type facebookStore = {
  url: string;
  setUrl: (url: string) => void;
};

export const FacebookStore = create<facebookStore>()(
  immer<facebookStore>((set) => ({
    url: "",
    setUrl: (url) => set((state) => void (state.url = url)),
  }))
);
