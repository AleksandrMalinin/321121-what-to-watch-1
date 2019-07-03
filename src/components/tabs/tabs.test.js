import React from 'react';
import renderer from 'react-test-renderer';
import {Tabs} from './tabs.jsx';
import {defaultMovie} from '../../mocks/mocks.js';

it(`Tabs correctly renders`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
  .create(
      <Tabs
        movie={defaultMovie}
        handleChange={mockFunction}
        handleCommentsLoad={mockFunction}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
