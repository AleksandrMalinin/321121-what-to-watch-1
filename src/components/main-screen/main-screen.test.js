import React from 'react';
import renderer from 'react-test-renderer';
import MainScreen from './main-screen.jsx';
import {films} from '../../mocks/films.js';

const mockGenres = films.map((film) => film.genre);

it(`MainScreen correctly renders`, () => {
  const tree = renderer
  .create(<MainScreen
    genres={mockGenres}
    moviesList={films}
    activeGenre={films[0].genre}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
