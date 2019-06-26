import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {AddReview} from './add-review.jsx';
import {defaultMovie} from '../../mocks/mocks.js';

it(`AddReview correctly renders`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
  .create(
      <BrowserRouter>
        <AddReview
          movie={defaultMovie}
          onPostReview={mockFunction}
        />
      </BrowserRouter>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
