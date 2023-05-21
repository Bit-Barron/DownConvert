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

export const VIDEO_FORMATS = ["orginal", "BFI", "CAF", "FLV", "GIF"] as const;

export type VideoFormat = (typeof VIDEO_FORMATS)[number];
export type ImageFormat = (typeof IMAGE_FORMATS)[number];
