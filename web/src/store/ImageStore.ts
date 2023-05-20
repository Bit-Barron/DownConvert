import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ImageFormat } from "../utils/constants";

export type ImageStore = {
  format: ImageFormat;
  setFormat: (format: ImageFormat) => void;

  images: Image[];
  upsertImage: (image: Image) => void;
  setAllImages: (images: Image[]) => void;

  selectedImages: Image[];
  setSelectedImage: (img: Image) => void;
}

export const ImageStore = create<ImageStore>()(
  immer<ImageStore>((set, get) => ({
    format: "orginal",
    setFormat: (format) => set((state) => ({ ...state, format })),

    images: [],
    upsertImage: (image) => {
      const foundImage = get().images.findIndex((i) => i.url === image.url);

      //image found === -1
      if (foundImage !== -1) {
        set((state) => void (state.images[foundImage] = image));
      } else {
        set((state) => void state.images.push(image));
      }
    },
    setAllImages: (images) => set((state) => void (state.images = images)),

    selectedImages: [],
    setSelectedImage: (img) => {
      const foundImage = get().selectedImages.findIndex(
        (i) => i.url === img.url
      );

      //image found === -1
      if (foundImage !== -1) {
        set((state) => void state.selectedImages.splice(foundImage, 1));
      } else {
        set((state) => void state.selectedImages.push(img));
      }
    },
  }))
);
