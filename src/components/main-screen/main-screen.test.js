import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import reducer from '../../reducer';
import {MainScreen} from './main-screen.jsx';
import {films} from '../../mocks/mocks.js';

const mockGenres = films.map((film) => film.genre);
const mockStore = createStore(reducer);

it(`MainScreen correctly renders`, () => {
  const tree = renderer
  .create(
      <Provider store={mockStore}>
        <BrowserRouter>
          <MainScreen
            genres={mockGenres}
            moviesList={films}
            activeGenre={films[0].genre}
          />
        </BrowserRouter>
      </Provider>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
