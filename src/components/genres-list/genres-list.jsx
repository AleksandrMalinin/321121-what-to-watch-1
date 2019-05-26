import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class GenresList extends PureComponent {
  render() {
    const {genres, activeGenre, onGenreChange} = this.props;

    return <ul className="catalog__genres-list">
      {genres.map((genre, i) => <li className={`catalog__genres-item ` + (activeGenre === genre ? `catalog__genres-item--active` : ``)} key={i}>
        <a href="#" className="catalog__genres-link" onClick={(evt) => onGenreChange(evt, genre)}>{genre}</a>
      </li>)}
    </ul>;
  }
}

GenresList.propTypes = {
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func
};

export default GenresList;
