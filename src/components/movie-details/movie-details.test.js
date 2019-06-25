import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {MovieDetails} from './movie-details.jsx';
import {films, defaultMovie} from '../../mocks/mocks.js';

it(`MovieDetails correctly renders`, () => {

  const tree = renderer
  .create(
      <BrowserRouter>
        <MovieDetails
          movie={defaultMovie}
          moviesAlike={films}
        />
      </BrowserRouter>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
