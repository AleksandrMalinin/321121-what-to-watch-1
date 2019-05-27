import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';
import {films} from '../../mocks/films.js';

it(`App correctly renders`, () => {
  const tree = renderer
  .create(<App
    moviesList={films}
    activeGenre={films[0].genre}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
