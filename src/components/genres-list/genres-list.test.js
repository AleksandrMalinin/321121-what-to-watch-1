import React from 'react';
import renderer from 'react-test-renderer';
import GenresList from './genres-list.jsx';
import {films} from '../../mocks/films.js';

const mockGenres = films.map((film) => film.genre);

it(`Filters correctly renders`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
  .create(<GenresList
    genres={mockGenres}
    activeItem={films[0].genre}
    onChange={mockFunction}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
