import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class ShowMore extends PureComponent {
  constructor(props) {
    super(props);

    this.handleMoreButtonClick = this._handleMoreButtonClick.bind(this);
    this.quantity = props.moviesLength >= props.moviesShown ? props.moviesShown : props.moviesLength;
  }

  render() {
    return <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={this.handleMoreButtonClick}>Show more</button>
    </div>;
  }

  _handleMoreButtonClick() {
    this.props.handleMoreButtonClick(this.quantity + this.props.moviesShown);
  }
}

ShowMore.propTypes = {
  handleMoreButtonClick: PropTypes.func,
  moviesLength: PropTypes.number,
  moviesShown: PropTypes.number
};

export default ShowMore;
