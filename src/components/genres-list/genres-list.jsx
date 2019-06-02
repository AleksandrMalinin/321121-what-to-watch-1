import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import withActiveItem from '../../hocs/with-active-item.js';

class GenresList extends PureComponent {
  constructor() {
    super();

    this.onGenreChange = (genre) => this._onGenreChange.bind(this, genre);
  }

  render() {
    const {genres, activeItem} = this.props;

    return <ul className="catalog__genres-list">
      {genres.map((genre, i) => <li className={`catalog__genres-item ` + (activeItem === genre ? `catalog__genres-item--active` : ``)} key={i}>
        <a href="#" className="catalog__genres-link" onClick={this.onGenreChange(genre)}>{genre}</a>
      </li>)}
    </ul>;
  }

  _onGenreChange(genre, event) {
    event.preventDefault();
    this.props.onChange(genre);
  }
}

GenresList.propTypes = {
  genres: PropTypes.array.isRequired,
  activeItem: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default withActiveItem(`All genres`)(GenresList);
