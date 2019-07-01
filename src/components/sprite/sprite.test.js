import React from 'react';
import renderer from 'react-test-renderer';
import Sprite from './sprite.jsx';

it(`Sprite correctly renders`, () => {
  const tree = renderer
  .create(
      <Sprite/>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
