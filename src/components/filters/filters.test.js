import React from 'react';
import renderer from 'react-test-renderer';
import Filters from './filters.jsx';

const mock = [
  `comedy`,
  `horror`,
  `detective`
];

it(`Filters correctly renders`, () => {
  const tree = renderer
  .create(<Filters
    genres={mock}
    activeGenre={mock[0]}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
