import React from 'react';
import renderer from 'react-test-renderer';
import GenresList from './genres-list.jsx';
import {films} from '../../mocks/mocks.js';

const mockGenres = films.map((film) => film.genre);

it(`Filters correctly renders`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
  .create(<GenresList
    genres={mockGenres}
    activeItem={films[0].genre}
    handleChange={mockFunction}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
