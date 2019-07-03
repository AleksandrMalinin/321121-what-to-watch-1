import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import reducer from '../../reducer';
import {MovieDetails} from './movie-details.jsx';
import {films, defaultMovie} from '../../mocks/mocks.js';

const mockStore = createStore(reducer);

it(`MovieDetails correctly renders`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer
  .render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <MovieDetails
            movie={defaultMovie}
            moviesAlike={films}
            onCommentsLoad={jest.fn()}
          />)
        </BrowserRouter>
      </Provider>
  );

  expect(tree).toMatchSnapshot();
});
