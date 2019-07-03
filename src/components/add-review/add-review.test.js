import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import reducer from '../../reducer';
import {AddReview} from './add-review.jsx';
import {defaultMovie, comment} from '../../mocks/mocks.js';

const mockStore = createStore(reducer);

it(`AddReview correctly renders`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
  .create(
      <Provider store={mockStore}>
        <BrowserRouter>
          <AddReview
            movie={defaultMovie}
            comment={comment.comment}
            onPostReview={mockFunction}
          />
        </BrowserRouter>
      </Provider>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
