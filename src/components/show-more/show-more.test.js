import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import ShowMore from './show-more.jsx';
import {constants} from '../../constants.js';

const moviesLength = 60;
const moviesShown = constants.LIMIT_QUANTITY;

it(`ShowMore correctly renders`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
  .create(
      <BrowserRouter>
        <ShowMore
          moviesLength={moviesLength}
          moviesShown={moviesShown}
          onMoreButtonClick={mockFunction}
        />
      </BrowserRouter>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
