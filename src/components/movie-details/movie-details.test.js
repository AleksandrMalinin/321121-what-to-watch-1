import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import reducer from '../../reducer';
import {MovieDetails} from './movie-details.jsx';
import {films, defaultMovie} from '../../mocks/mocks.js';

const mockStore = createStore(reducer);

it(`MovieDetails correctly renders`, () => {
  const tree = renderer
  .create(
      <Provider store={mockStore}>
        <BrowserRouter>
          <MovieDetails
            movie={defaultMovie}
            moviesAlike={films}
          />
        </BrowserRouter>
      </Provider>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
