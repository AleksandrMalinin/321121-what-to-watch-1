import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class GenresList extends PureComponent {
  constructor() {
    super();

    this.onGenreChange = (genre) => this._onGenreChange.bind(this, genre);
  }

  render() {
    const {genres, activeGenre} = this.props;

    return <ul className="catalog__genres-list">
      {genres.map((genre, i) => <li className={`catalog__genres-item ` + (activeGenre === genre ? `catalog__genres-item--active` : ``)} key={i}>
        <a href="#" className="catalog__genres-link" onClick={this.onGenreChange(genre)}>{genre}</a>
      </li>)}
    </ul>;
  }

  _onGenreChange(genre, event) {
    event.preventDefault();
    this.props.onGenreChange(genre);
  }
}

GenresList.propTypes = {
  genres: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func
};

export default GenresList;
