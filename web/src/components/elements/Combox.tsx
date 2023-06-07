import { Combobox } from "@headlessui/react";
import {
  ImageFormat,
  IMAGE_FORMATS,
  VIDEO_FORMATS,
  VideoFormat,
} from "../../utils/constants";
import { classNames } from "../../utils/helpers";
import { HiSelector } from "react-icons/hi";

interface FormatComboxProps {
  format: ImageFormat | VideoFormat;
  setFormat: (value: ImageFormat | VideoFormat) => void;
  formats: typeof IMAGE_FORMATS | typeof VIDEO_FORMATS;
}

export const FormatCombox: React.FC<FormatComboxProps> = ({
  format,
  setFormat,
  formats,
}) => {
  return (
    <>
      <Combobox as="div" value={format} onChange={setFormat}>
        <div className="relative">
          <Combobox.Input
            className="relative w-full cursor-default rounded-lg bg-combox py-2 pl-3 pr-10 text-left text-white shadow-md focus:outline-none focus-visible:ring-2 sm:text-sm"
            onChange={(event) =>
              setFormat(event.target.value as ImageFormat | VideoFormat)
            }
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <HiSelector className="h-5 w-5 text-gray-400" />
          </Combobox.Button>
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-combox py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {formats.map((f) => (
              <Combobox.Option
                key={f}
                value={f}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-8 pr-4",
                    active ? "bg-primary text-white" : "text-white"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames("block truncate")}>{f}</span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 left-0 flex items-center pl-1.5",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      ></span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </>
  );
};
