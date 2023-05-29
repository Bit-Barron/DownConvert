export const IMAGE_FORMATS = [
  "orginal",
  "heic",
  "heif",
  "avif",
  "jpeg",
  "jpg",
  "jpe",
  "tile",
  "dz",
  "png",
  "raw",
  "tiff",
  "tif",
  "webp",
  "gif",
  "jp2",
  "jpx",
  "j2k",
  "j2c",
  "jxl",
] as const;


export const VIDEO = [
  {
    name: "https://www.facebook.com",
    domains: ["test.com"],
  },
  {
    name: "https://www.snapchat.com",
    domains: ["test.com"],
  },
  {
    name: "https://www.instagram.com",
    domains: ["test.com"],
  },
  {
    name: "https://v.redd.it",
    domains: ["asd"],
  },
  {
    name: "https://www.tiktok.com",
    domains: ["https://v16-webapp-prime.tiktok.com"],
  },
] as const;

export type Video = (typeof VIDEO)[number];

export const VIDEO_FORMATS = ["orginal", "BFI", "CAF", "FLV", "GIF"] as const;

export type VideoFormat = (typeof VIDEO_FORMATS)[number];
export type ImageFormat = (typeof IMAGE_FORMATS)[number];
