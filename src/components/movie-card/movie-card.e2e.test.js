import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieCard from './movie-card.jsx';
import {films} from '../../mocks/films.js';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

it(`On movie card click handler is being called`, () => {
  const handleClick = jest.fn();
  const app = shallow(<MovieCard
    movie={films[0]}
    onClick={handleClick}
  />);

  const link = app.find(`.small-movie-card__link`);
  link.simulate(`click`);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

it(`On movie-card mouseenter handler is being called`, () => {
  const handleMouseEnter = jest.fn();
  const app = shallow(<MovieCard
    movie={films[0]}
    onMouseEnter={handleMouseEnter}
  />);

  app.simulate(`mouseenter`);
  expect(handleMouseEnter).toHaveBeenCalledTimes(1);
});

it(`On movie-card mouseleave handler is being called`, () => {
  const handleMouseLeave = jest.fn();
  const app = shallow(<MovieCard
    movie={films[0]}
    onMouseLeave={handleMouseLeave}
  />);

  app.simulate(`mouseleave`);
  expect(handleMouseLeave).toHaveBeenCalledTimes(1);
});
