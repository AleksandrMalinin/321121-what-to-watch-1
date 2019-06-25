import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import MovieCard from './movie-card.jsx';
import {films} from '../../mocks/mocks.js';

it(`MovieCard correctly renders`, () => {

  const tree = renderer
  .create(
      <BrowserRouter>
        <MovieCard
          movie={films[0]}
        />
      </BrowserRouter>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
