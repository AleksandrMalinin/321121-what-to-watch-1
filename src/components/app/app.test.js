import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const props = [
  `Fantastic Beasts: The Crimes of Grindelwald`,
  `Bohemian Rhapsody`,
  `Macbeth`,
  `Aviator`
];

it(`App correctly renders`, () => {
  const tree = renderer
  .create(<App
    movieTitles={props}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
