import React from 'react';
import renderer from 'react-test-renderer';
import MainScreen from './main-screen.jsx';

const props = {
  movieTitles: [
    `Fantastic Beasts: The Crimes of Grindelwald`,
    `Bohemian Rhapsody`,
    `Macbeth`,
    `Aviator`
  ]
};

it(`MainScreen correctly renders`, () => {

  const tree = renderer
  .create(<MainScreen
    {...props}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
