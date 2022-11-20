/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```

*/

import { useState } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  const [tabs, setTabs] = useState([
    { name: "My Accounts", current: false },
    { name: "Subscription", current: false },
    { name: "Images", current: true },
    { name: "Videos", current: false },
  ]);

  const currentMenu = tabs.find((tab) => tab.current);

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:text-[#E96C4C]"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option
              key={tab.name}
              onClick={() => {
                const newTabs = tabs.map((t) => {
                  if (t.name === tab.name) {
                    t.current = true;
                  } else {
                    t.current = false;
                  }
                  return t;
                });
                setTabs(newTabs);
              }}
            >
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <div>
                <a
                  key={tab.name}
                  onClick={() => {
                    const newTabs = tabs.map((t) => {
                      if (t.name === tab.name) {
                        t.current = true;
                      } else {
                        t.current = false;
                      }
                      return t;
                    });
                    setTabs(newTabs);
                  }}
                  className={classNames(
                    tab.current
                      ? "border-[#E96C4C] text-[#E96C4C]"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  <span>{tab.name}</span>
                </a>
              </div>
            ))}
          </nav>
        </div>
      </div>
      {/* <div>
        {currentMenu?.name === "My Accounts" && (
          <div className="text-4xl text-white">tab1</div>
        )}
      </div>
      <div className="text-white">{currentMenu?.name === "Subscription" && <Subscription />}</div>
      <div className="text-white">{currentMenu?.name === "Images" && <div>asdas</div>}</div> */}
    </div>
  );
}
