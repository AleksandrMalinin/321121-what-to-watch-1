import React from 'react';
import renderer from 'react-test-renderer';
import Logo from './logo.jsx';
import {BrowserRouter} from 'react-router-dom';

it(`Logo correctly renders`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <Logo/>
      </BrowserRouter>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
