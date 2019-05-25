import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Filters extends PureComponent {
  render() {
    const {genres, activeGenre, onGenreChange} = this.props;

    return <ul className="catalog__genres-list">
      <li className={`catalog__genres-item ` + (activeGenre === `All genres` ? `catalog__genres-item--active` : ``)}>
        <a href="#" className="catalog__genres-link" onClick={(evt) => onGenreChange(evt, `All genres`)}>All genres</a>
      </li>
      {genres.map((genre, i) => <li className={`catalog__genres-item ` + (activeGenre === genre ? `catalog__genres-item--active` : ``)} key={i}>
        <a href="#" className="catalog__genres-link" onClick={(evt) => onGenreChange(evt, genre)}>{genre}</a>
      </li>)}
    </ul>;
  }
}

Filters.propTypes = {
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func
};

export default Filters;
