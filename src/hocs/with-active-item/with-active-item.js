import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (initialItem) => (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: initialItem
      };

      this.handleItemChange = this._handleItemChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        activeItem={this.state.activeItem}
        onChange={this.handleItemChange}
      />;
    }

    _handleItemChange(item) {
      this.setState({
        activeItem: item
      });
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.string,
    onChange: PropTypes.func
  };

  return WithActiveItem;
};

export default withActiveItem;
