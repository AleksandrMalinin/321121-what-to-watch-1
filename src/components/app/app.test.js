import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import reducer from '../../reducer';
import {App} from './app.jsx';
import {films} from '../../mocks/mocks.js';

const mockGenres = films.map((film) => film.genre);
const mockStore = createStore(reducer);

it(`App correctly renders`, () => {
  const tree = renderer
  .create(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App
            moviesList={films}
            activeGenre={films[0].genre}
            genres={mockGenres}
            isAuthorizationRequired={false}
          />
        </BrowserRouter>
      </Provider>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
