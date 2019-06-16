import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import SignIn from './sign-in.jsx';

it(`SignIn correctly renders`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <SignIn
          onSubmit={() => jest.fn()}
        />
      </BrowserRouter>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
