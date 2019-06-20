import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {MovieDetails} from './movie-details.jsx';
import {films} from '../../mocks/films.js';

it(`MovieDetails correctly renders`, () => {

  const tree = renderer
  .create(
      <BrowserRouter>
        <MovieDetails
          movie={films[0]}
        />
      </BrowserRouter>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
