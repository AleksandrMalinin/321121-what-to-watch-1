import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (initialItem) => (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: initialItem
      };

      this.onItemChange = this.onItemChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        activeItem={this.state.activeItem}
        onChange={this.onItemChange}
      />;
    }

    onItemChange(item) {
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
