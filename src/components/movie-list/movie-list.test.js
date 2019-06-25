import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import MovieList from './movie-list.jsx';
import {films} from '../../mocks/mocks.js';

it(`MovieList correctly renders`, () => {

  const tree = renderer
  .create(
      <BrowserRouter>
        <MovieList
          movies={films}
        />
      </BrowserRouter>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
