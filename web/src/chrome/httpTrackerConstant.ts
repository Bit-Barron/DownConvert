export const httpTracker = {
  //@ts-ignore
  browser: window.browser || window.chrome,
  //@ts-ignore
  isFF: window.browser ? true : false,
  PAGE_PATH: '/src/html/http-tracker.html',
  STORAGE_KEY_EXCLUDE_PATTERN: 'httpTrackerGlobalExcludePatterns',
  STORAGE_KEY_INCLUDE_PATTERN: 'httpTracker_GlobalIncludePatterns',
  STORAGE_KEY_BLOCK_PATTERN: 'httpTracker_GlobalBlockPatterns',
  STORAGE_KEY_MASK_PATTERN: 'httpTracker_GlobalMaskPatterns',
  STORAGE_KEY_OPEN_ADDON_IN_TAB: 'httpTracker_OpenAddonInTab',
};
