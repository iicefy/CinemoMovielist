import { Skeleton } from "@mui/material";
import { useState } from "react";
import {
  LazyLoadImage,
  LazyLoadImageProps,
} from "react-lazy-load-image-component";

type LoadingImageProps = {
  src: string;
  alt: string;
} & LazyLoadImageProps;

const LoadingImage = ({ src, alt, ...rest }: LoadingImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  return (
    <div>
      <LazyLoadImage
        style={{ opacity: isImageLoaded ? 1 : 0 }}
        src={src}
        alt={alt}
        {...rest}
        loading="lazy"
        onLoad={() => setIsImageLoaded(true)}
      />
      {!isImageLoaded && (
        <Skeleton
          variant="rectangular"
          sx={{
            height: "100%",
            width: "100%",
            //   backgroundColor: "red",
          }}
          animation="wave"
        />
      )}
    </div>
  );
};

export default LoadingImage;
