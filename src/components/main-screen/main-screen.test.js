import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {MainScreen} from './main-screen.jsx';
import {films} from '../../mocks/mocks.js';

const mockGenres = films.map((film) => film.genre);

it(`MainScreen correctly renders`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <MainScreen
          genres={mockGenres}
          moviesList={films}
          activeGenre={films[0].genre}
        />
      </BrowserRouter>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
