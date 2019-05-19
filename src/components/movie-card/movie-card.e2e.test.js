import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieCard from './movie-card.jsx';
import {films} from '../../mocks/films.js';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

it(`On movie card click handler is being called`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<MovieCard
    movie={films[0]}
    onClick={clickHandler}
  />);

  const link = app.find(`.small-movie-card__link`);
  link.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it(`On movie-card mouseenter handler is being called`, () => {
  const mouseEnterHandler = jest.fn();
  const app = shallow(<MovieCard
    movie={films[0]}
    onMouseEnter={mouseEnterHandler}
  />);

  app.simulate(`mouseenter`);
  expect(mouseEnterHandler).toHaveBeenCalledTimes(1);
});

it(`On movie-card mouseleave handler is being called`, () => {
  const mouseLeaveHandler = jest.fn();
  const app = shallow(<MovieCard
    movie={films[0]}
    onMouseLeave={mouseLeaveHandler}
  />);

  app.simulate(`mouseleave`);
  expect(mouseLeaveHandler).toHaveBeenCalledTimes(1);
});
