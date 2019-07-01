import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {MyList} from './my-list.jsx';
import {films} from '../../mocks/mocks.js';

it(`MyList correctly renders`, () => {
  const renderer = new ShallowRenderer();
  const mockFunction = jest.fn();
  const tree = renderer
  .render(
      <MyList
        moviesFavourite={films}
        onGenreChange={mockFunction}
      />
  );

  expect(tree).toMatchSnapshot();
});
