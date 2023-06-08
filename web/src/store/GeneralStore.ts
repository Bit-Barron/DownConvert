import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { uid } from "../utils/helpers/clientHelper";
import { Alert, AlertType } from "../types";

type Tab = "image" | "video";

export type GeneralStore = {
  tab: Tab;
  setTab: (tab: Tab) => void;

  alerts: Alert[];
  addAlert: (alert: { msg: string; type: AlertType }) => void;
  removeAlert: (id: string) => void;
};

export const GeneralStore = create<GeneralStore>()(
  immer<GeneralStore>((set, get) => ({
    tab: "image",
    setTab: (tab) => set((state) => ({ ...state, tab })),
    alerts: [],
    addAlert(alert) {
      set((state) => void state.alerts.push({ ...alert, id: uid() }));
    },
    removeAlert(id) {
      set(
        (state) => void (state.alerts = get().alerts.filter((e) => id !== e.id))
      );
    },
  }))
);
