import { Li } from './ImageGalleryItem.styled';

function ImageGalleryItem({ itemData, onClikImg }) {
  const { tags, webformatURL, largeImageURL } = itemData;
  return (
    <Li>
      <img
        onClick={() => onClikImg({ img: largeImageURL, alt: tags })}
        src={webformatURL}
        alt={tags}
      />
    </Li>
  );
}

export default ImageGalleryItem;
