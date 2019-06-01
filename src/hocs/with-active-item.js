import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.activeItem || null
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
      const changeState = (evt) => {
        this.setState({
          activeItem: item
        });

        if (this.props.onChange) {
          evt.preventDefault();
          this.props.onChange(item);
        }
      };

      return changeState;
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.string,
    onChange: PropTypes.func
  };

  return WithActiveItem;
};


export default withActiveItem;
