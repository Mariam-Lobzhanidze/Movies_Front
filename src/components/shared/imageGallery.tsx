import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { GalleryImage } from "./types";
import SectionTitle from "./sectionTitle";

export interface ImageGalleryComponentProps {
  title: string;
  images: GalleryImage[];
}

const ImageGalleryComponent: React.FC<ImageGalleryComponentProps> = ({ images, title }) => {
  return (
    <div className="section">
      <SectionTitle title={title} count={images.length} />
      <div className="image-gallery-wrapper">
        <ImageGallery autoPlay={true} items={images} showThumbnails={false} showFullscreenButton={true} />
      </div>
    </div>
  );
};

export default ImageGalleryComponent;
