import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {App} from './app.jsx';
import {films} from '../../mocks/films.js';

const mockGenres = films.map((film) => film.genre);

it(`App correctly renders`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <App
          moviesList={films}
          activeGenre={films[0].genre}
          genres={mockGenres}
          isAuthorizationRequired={false}
        />
      </BrowserRouter>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
