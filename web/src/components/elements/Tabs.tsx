import { classNames } from "../../utils/helpers";

const tabs = [
  { name: "Images", href: "#", current: false, count: "12" },
  { name: "Videos", href: "#", current: false, count: "12" },
];

export function Tabs() {
  return (
    <div className="mt-[100px] w-full">
      <div className="">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" >
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href="#"
                className={classNames(
                  tab.current
                    ? "border-indigo-500 flex justify-between hover:text-primary text-indigo-600"
                    : "border-transparent text-gray-500 flex justify-between hover:text-primary",
                  "flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
                {tab.count ? (
                  <span
                    className={classNames(
                      tab.current
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-gray-100 text-white",
                      "ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium"
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
