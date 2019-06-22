import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class ShowMore extends PureComponent {
  constructor(props) {
    super(props);

    this.onMoreButtonClick = this._onMoreButtonClick.bind(this);
    this.quantity = props.moviesLength >= props.moviesShown ? props.moviesShown : props.moviesLength;
  }

  render() {
    return <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={this.onMoreButtonClick}>Show more</button>
    </div>;
  }


  _onMoreButtonClick() {
    this.props.onMoreButtonClick(this.quantity + this.props.moviesShown);
  }
}

ShowMore.propTypes = {
  onMoreButtonClick: PropTypes.func,
  moviesLength: PropTypes.number,
  moviesShown: PropTypes.number
};

export default ShowMore;
