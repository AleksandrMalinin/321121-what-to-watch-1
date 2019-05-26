import React from 'react';
import renderer from 'react-test-renderer';
import GenresList from './genres-list.jsx';
import {films} from '../../mocks/films.js';

const mockGenres = films.map((film) => film.genre);

it(`Filters correctly renders`, () => {
  const tree = renderer
  .create(<GenresList
    genres={mockGenres}
    activeGenre={films[0].genre}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
