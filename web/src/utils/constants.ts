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

    //youtube
      //snapchat
      //facebook
      //instagram
      //tiktok

export const VIDEO = [
  {
    name: "Facebook",
    domains: ["test.com", "hallo.com"],
  },
  {
    name: "Youtube",
    domains: ["test.com", "hallo.com"],
  },
  {
    name: "Snapchat",
    domains: ["test.com", "hallo.com"],
  },
  {
    name: "instagram",
    domains: ["test.com", "hallo.com"],
  },
  {
    name: "Tiktok",
    domains: ["test.com", "hallo.com"],
  },
];

export const VIDEO_FORMATS = ["orginal", "BFI", "CAF", "FLV", "GIF"] as const;

export type VideoFormat = (typeof VIDEO_FORMATS)[number];
export type ImageFormat = (typeof IMAGE_FORMATS)[number];
