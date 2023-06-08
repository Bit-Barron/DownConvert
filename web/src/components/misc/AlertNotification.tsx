import React, { useEffect } from "react";
import { GeneralStore } from "../../store/GeneralStore";
import { AlertType } from "../../types";
import { AiFillInfoCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface AlertNotificationProps {
  id: string;
  className?: string;
  type?: AlertType;
  msg: string;
}

export const AlertNotification: React.FC<AlertNotificationProps> = ({
  id,
  msg,
  type,
  className,
}) => {
  const { removeAlert } = GeneralStore();
  let colors: {
    background: string;
    icon: string;
  };

  useEffect(() => {
    setTimeout(() => removeAlert(id), 10000);
  }, [id, removeAlert]);

  if (type === "failure") {
    colors = {
      background: "border-red-500 bg-red-100 text-red-700",
      icon: "bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-400",
    };
  } else {
    colors = {
      background: "border-blue-500 bg-blue-100 text-blue-700",
      icon: "bg-blue-100 text-blue-500 hover:bg-blue-200 focus:ring-blue-400",
    };
  }

  return (
    <div className={`${className} `}>
      <div className={`mb-4 flex border-t-4 p-4 ${colors.background}`}>
        <AiFillInfoCircle className="text-2xl" />
        <div className="ml-3 text-sm font-medium">{msg}</div>
        <AiOutlineCloseCircle
          onClick={() => removeAlert(id)}
          className={`-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg  p-1.5 focus:ring-2 ${colors.icon}`}
        />
      </div>
    </div>
  );
};
