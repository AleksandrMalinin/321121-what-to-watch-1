import React from 'react';
import renderer from 'react-test-renderer';
import Review from './review.jsx';
import {comment} from '../../mocks/mocks.js';

it(`Review correctly renders`, () => {
  const tree = renderer
  .create(
      <Review
        comment={comment}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
