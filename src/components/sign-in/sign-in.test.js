import React from 'react';
import renderer from 'react-test-renderer';
import {SignIn} from './sign-in.jsx';

it(`App correctly renders`, () => {
  const tree = renderer
  .create(<SignIn
    loginUser={() => jest.fn()}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
