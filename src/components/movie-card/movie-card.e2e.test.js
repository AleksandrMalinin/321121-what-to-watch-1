import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieCard from './movie-card.jsx';
import {films} from '../../mocks/films.js';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

it(`On movie card click`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<MovieCard
    movie={films[0]}
    onClick={clickHandler}
  />);

  const link = app.find(`.small-movie-card__link`);
  link.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it(`On play-button click callback's information is correct`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<MovieCard
    movie={films[0]}
    onPlayClick={clickHandler}
  />);

  const play = app.find(`.small-movie-card__play-btn`);
  play.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledWith(films[0]);
});
