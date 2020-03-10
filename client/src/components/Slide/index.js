import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

const Slide = ({ images }) => {
  return (
    <ImageGallery
      thumbnailPosition="left"
      showFullscreenButton={true}
      showPlayButton={false}
      showNav={false}
      items={images.map(image => ({
        original: image,
        thumbnail: image
      }))}
    />
  );
};

export default Slide;
