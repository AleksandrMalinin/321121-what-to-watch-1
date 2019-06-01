import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class GenresList extends PureComponent {
  render() {
    const {genres, activeItem, onChange} = this.props;

    return <ul className="catalog__genres-list">
      {genres.map((genre, i) => <li className={`catalog__genres-item ` + (activeItem === genre ? `catalog__genres-item--active` : ``)} key={i}>
        <a href="#" className="catalog__genres-link" onClick={onChange(genre)}>{genre}</a>
      </li>)}
    </ul>;
  }
}

GenresList.propTypes = {
  genres: PropTypes.array.isRequired,
  activeItem: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default GenresList;
