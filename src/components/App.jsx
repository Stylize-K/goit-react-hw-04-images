import { useState, useEffect } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'services/apiService';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import css from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [endCollection, setEndCollection] = useState(false);

  //Функція обробки сабміту форми - додаємо дані в state (дані отримуємо з компонента serchBar)
  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setEndCollection(false);
  };

  //Функція обробки кліка по кнопці "Load more"
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  //При кожній зміні значень query та page - виконуємо запит на backend.
  useEffect(() => {
    //Уникаємо роботи useEffeсt при першому рендері
    if (query === '') {
      return;
    }
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImages(query, page);
        setImages(prev => [...prev, ...data.hits]);
        console.log(data);
        if (!data.totalHits) {
          return toast.success(
            'Sorry, there are no images matching your search query. Please try again'
          );
        }
        const totalPages = Math.ceil(data.totalHits / 12);
        if (page === totalPages) {
          setEndCollection(true);
          toast.success('No more pictures');
        }
      } catch (error) {
        console.log('Error', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  //Умова для рендеру кнопку "Load more" => коли масив отриманих картинок не пустий и це не кінець колекції.
  const showLoadMoreBtn = images.length > 0 && !endCollection;

  return (
    <div className={css.app}>
      <Toaster position="top-right" reverseOrder={false} />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />
      {showLoadMoreBtn && <Button onClick={() => handleLoadMore()} />}
      {isLoading && (
        <Loader>
          <ThreeCircles
            height="100"
            width="100"
            color="#063970"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </Loader>
      )}
    </div>
  );
};
