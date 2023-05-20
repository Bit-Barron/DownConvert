import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Tab = "image" | "video";

export type GeneralStore =  {
  tab: Tab;
  setTab: (tab: Tab) => void;
}

export const GeneralStore = create<GeneralStore>()(
  immer<GeneralStore>((set) => ({
    tab: "image",
    setTab: (tab) => set((state) => ({ ...state, tab })),
  }))
);
