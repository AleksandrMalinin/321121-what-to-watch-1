import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import {films} from '../../mocks/films.js';

it(`App correctly renders`, () => {
  const tree = renderer
  .create(<App
    movies={films}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
