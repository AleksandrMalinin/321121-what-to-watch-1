import React from 'react';
import renderer from 'react-test-renderer';
import MovieList from './movie-list.jsx';
import {films} from '../../mocks/films.js';

it(`MovieList correctly renders`, () => {

  const tree = renderer
  .create(<MovieList
    movies={films}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
