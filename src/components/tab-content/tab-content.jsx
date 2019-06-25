import React from 'react';
import PropTypes from 'prop-types';

const TabContent = (props) => {
  const {activeItem, tabName, children} = props;

  return <div>
    {activeItem === tabName ? children : null}
  </div>;
};

TabContent.propTypes = {
  activeItem: PropTypes.string,
  tabName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

export default TabContent;
