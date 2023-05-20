import React from "react";
import { AiOutlineScan } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { MdVideoSettings } from "react-icons/md";
import { classNames } from "../../utils/helpers";
import { GeneralStore } from "../../store/GeneralStore";
import { ImageStore } from "../../store/ImageStore";
import { VideoStore } from "../../store/VideoStore";

export const Tabs: React.FC = () => {
  const { setTab } = GeneralStore();
  const { images } = ImageStore();
  const { video } = VideoStore();

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
      count: video.length,
      onClick: () => setTab("video"),
    },
    {
      count: "100",
      current: false,
      icon: <AiOutlineScan />,
      css: true,
    },
  ];

  return (
    <div className="global_container fixed w-full bg-downloadContainer p-3">
      <div className="flex justify-between">
        {tabs.map((tab, idx) => (
          <div key={idx} className="flex justify-between" onClick={tab.onClick}>
            <div className="text-xl text-white hover:text-primary">
              {tab.icon}
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
          </div>
        ))}
      </div>
    </div>
  );
};
