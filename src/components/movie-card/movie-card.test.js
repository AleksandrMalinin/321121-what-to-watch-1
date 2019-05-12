import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from './movie-card.jsx';

const mock = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  src: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
};

it(`MainScreen correctly renders`, () => {

  const tree = renderer
  .create(<MovieCard
    movie={mock}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
