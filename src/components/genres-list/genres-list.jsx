import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import {constants} from '../../constants.js';

class GenresList extends PureComponent {
  constructor() {
    super();

    this.handleGenreChange = (genre) => this._handleGenreChange.bind(this, genre);
  }

  render() {
    const {genres, activeItem} = this.props;

    return <ul className="catalog__genres-list">
      {genres.map((genre, i) => <li className={`catalog__genres-item ` + (activeItem === genre ? `catalog__genres-item--active` : ``)} key={i}>
        <a href="#" className="catalog__genres-link" onClick={this.handleGenreChange(genre)}>{genre}</a>
      </li>)}
    </ul>;
  }

  _handleGenreChange(genre, event) {
    event.preventDefault();
    this.props.handleChange(genre);
    this.props.handleGenreChange(genre);
  }
}

GenresList.propTypes = {
  genres: PropTypes.array.isRequired,
  activeItem: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  handleGenreChange: PropTypes.func
};

export default withActiveItem(constants.DEFAULT_GENRE)(GenresList);
