import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import reducer from '../../reducer';
import SignIn from './sign-in.jsx';

const mockStore = createStore(reducer);

it(`SignIn correctly renders`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
  .create(
      <Provider store={mockStore}>
        <BrowserRouter>
          <SignIn
            onSubmit={mockFunction}
          />
        </BrowserRouter>
      </Provider>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
