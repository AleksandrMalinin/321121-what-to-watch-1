import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import reducer from '../../reducer';
import MyList from './my-list.jsx';
import {films} from '../../mocks/mocks.js';

const mockStore = createStore(reducer);

it(`MyList correctly renders`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
  .create(
      <Provider store={mockStore}>
        <BrowserRouter>
          <MyList
            movies={films}
            onGenreChange={mockFunction}
          />
        </BrowserRouter>
      </Provider>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
