import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieCard from './movie-card.jsx';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

const mock = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  src: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
};

it(`On movie card click`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<MovieCard
    movie={mock}
    onClick={clickHandler}
  />);

  const link = app.find(`.small-movie-card__link`);
  link.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it(`On play-button click callback's information is correct`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<MovieCard
    movie={mock}
    onPlayClick={clickHandler}
  />);

  const play = app.find(`.small-movie-card__play-btn`);
  play.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledWith(mock);
});
