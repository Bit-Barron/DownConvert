import React from "react";
import { GeneralStore } from "../../store/GeneralStore";
import { AlertNotification } from "../misc/AlertNotification";

export const Alerts: React.FC = () => {
  const { alerts } = GeneralStore();
  return (
    <div
      className={`absolute bottom-0 right-0 z-50 px-2 md:top-5 md:right-5 md:bottom-auto`}
    >
      {alerts.map(({ id, msg, type }) => (
        <AlertNotification
          key={id}
          className="mt-2"
          type={type}
          id={id}
          msg={msg}
        />
      ))}
    </div>
  );
};
