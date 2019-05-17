import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from './movie-card.jsx';
import {films} from '../../mocks/films.js';

it(`MovieCard correctly renders`, () => {

  const tree = renderer
  .create(<MovieCard
    movie={films[0]}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
