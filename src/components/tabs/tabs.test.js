import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import reducer from '../../reducer';
import Tabs from './tabs.jsx';
import {defaultMovie} from '../../mocks/mocks.js';

const mockStore = createStore(reducer);

it(`Tabs correctly renders`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
  .create(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Tabs
            movie={defaultMovie}
            onChange={mockFunction}
          />
        </BrowserRouter>
      </Provider>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
