import { Modal } from './Modal/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState('');
  const [modalImageURL, setModalImageURL] = useState('');

  //Функуція відкриття модального вікна
  const openModal = (url, tags) => {
    setShowModal(true);
    setModalImageURL(url);
    setTags(tags);
  };

  //Функція закриття модального вікна
  const closeModal = () => {
    setShowModal(false);
    setModalImageURL('');
    setTags('');
  };
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => openModal(image.largeImageURL, image.tags)}
      />
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={modalImageURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
