import React from 'react';
import renderer from 'react-test-renderer';
import MainScreen from './main-screen.jsx';

const mock = [
  {
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    src: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
  },
  {
    title: `Bohemian Rhapsody`,
    src: `img/bohemian-rhapsody.jpg`
  },
  {
    title: `Macbeth`,
    src: `img/macbeth.jpg`
  },
  {
    title: `Aviator`,
    src: `img/aviator.jpg`
  },
  {
    title: `We need to talk about Kevin`,
    src: `img/we-need-to-talk-about-kevin.jpg`
  }
];

it(`MainScreen correctly renders`, () => {

  const tree = renderer
  .create(<MainScreen
    movies={mock}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
