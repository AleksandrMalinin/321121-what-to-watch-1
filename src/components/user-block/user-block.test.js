import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import reducer from '../../reducer';
import UserBlock from './user-block.jsx';

const mockStore = createStore(reducer);

it(`UserBlock correctly renders`, () => {
  const tree = renderer
  .create(
      <Provider store={mockStore}>
        <BrowserRouter>
          <UserBlock
            isAuthorizationRequired={true}
          />
        </BrowserRouter>
      </Provider>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
