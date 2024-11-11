import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { GalleryImage } from "./types";
import SectionTitle from "./sectionTitle";

export interface ImageGalleryComponentProps {
  title: string;
  images: GalleryImage[];
  thumbnail: boolean;
}

const ImageGalleryComponent: React.FC<ImageGalleryComponentProps> = ({ images, title, thumbnail }) => {
  return (
    <div>
      <SectionTitle title={title} count={images.length} />
      <div className="image-gallery-wrapper">
        <ImageGallery
          autoPlay={true}
          items={images}
          showThumbnails={thumbnail}
          showFullscreenButton={false}
        />
      </div>
    </div>
  );
};

export default ImageGalleryComponent;
