import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

const Slide = ({ images }) => {
  const [imagesShow, setImagesShow] = useState([])
  useEffect(() => {
    var a = images.map(image => ({
      original: image,
      thumbnail: image
    }))
    setImagesShow(a)
  }, [images])
  return (
    <ImageGallery
      thumbnailPosition="left"
      showFullscreenButton={true}
      showPlayButton={false}
      showNav={false}
      items={imagesShow}
    />
  )
}

export default Slide
