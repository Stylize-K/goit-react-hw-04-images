import { useState } from 'react';
import toast from 'react-hot-toast';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  //Функція, що зберігає поточне значення імпута у змінній query
  const handleImputChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  //Функція, що виконує сабміт форми. Значення query передається вгору в бітьківський компонент App. Якщо імпут порожній - з'являється повідомлення.
  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.error('You didnt enter anything');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.searchBar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <button type="submit" className={css.searchFormButton}>
          <FcSearch size={'2em'} />
        </button>
        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleImputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
