import React from 'react';
import renderer from 'react-test-renderer';
import TabContent from './tab-content.jsx';

it(`TabContent correctly renders`, () => {
  const tree = renderer
  .create(<TabContent/>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
