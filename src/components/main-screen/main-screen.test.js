import React from 'react';
import renderer from 'react-test-renderer';
import MainScreen from './main-screen.jsx';
import {films} from '../../mocks/films.js';

it(`MainScreen correctly renders`, () => {

  const tree = renderer
  .create(<MainScreen
    movies={films}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
