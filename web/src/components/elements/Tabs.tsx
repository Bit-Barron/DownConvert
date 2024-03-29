import React from "react";
import { BsImages } from "react-icons/bs";
import { MdVideoSettings } from "react-icons/md";
import { GeneralStore } from "../../store/GeneralStore";
import { ImageStore } from "../../store/ImageStore";
import { VideoStore } from "../../store/VideoStore";
import { classNames } from "../../utils/helpers";
import { Alerts } from "../utils/Alerts";

export const Tabs: React.FC = () => {
  const { setTab, alerts } = GeneralStore();
  const { images } = ImageStore();
  const { url } = VideoStore();


  const tabs = [
    {
      current: false,
      icon: <BsImages />,
      count: images.length,
      onClick: () => setTab("image"),
    },
    {
      current: false,
      icon: <MdVideoSettings />,
      count: url ? 1 : 0,
      onClick: () => setTab("video"),
    },
  ];

  return (
    <div className="global_container fixed w-full bg-downloadContainer p-3">
      <div className="flex justify-between">
        {tabs.map((tab, idx) => (
          <a key={idx} className="flex justify-between" onClick={tab.onClick}>
            <div className="text-xl text-white hover:text-primary">
              {tab.icon}
            </div>
            <div>
              {alerts.map((alert) => (
                <div key={alert.id}>
                  <Alerts />
                </div>
              ))}
            </div>
            {tab.count ? (
              <span
                className={classNames(
                  tab.current ? "text-indigo-600" : "text-white",
                  "rounded-full px-2.5 py-0.5 text-xs font-medium"
                )}
              >
                {tab.count}
              </span>
            ) : null}
          </a>
        ))}
      </div>
    </div>
  );
};
