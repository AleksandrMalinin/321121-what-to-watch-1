import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import MovieCard from './movie-card.jsx';
import {films} from '../../mocks/mocks.js';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

it(`On movie-card click handler is being called`, () => {
  const handleClick = jest.fn();
  const app = mount(
      <BrowserRouter>
        <MovieCard
          movie={films[0]}
          handleClick={handleClick}
        />
      </BrowserRouter>
  );

  const link = app.find(`.small-movie-card__link`).first();
  link.simulate(`click`);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

it(`On movie-card mouseenter handler is being called`, () => {
  const handleMouseEnter = jest.fn();
  const app = mount(
      <BrowserRouter>
        <MovieCard
          movie={films[0]}
          handleMouseEnter={handleMouseEnter}
        />
      </BrowserRouter>
  );

  app.simulate(`mouseenter`);
  expect(handleMouseEnter).toHaveBeenCalledTimes(1);
});

it(`On movie-card mouseleave handler is being called`, () => {
  const handleMouseLeave = jest.fn();
  const app = mount(
      <BrowserRouter>
        <MovieCard
          movie={films[0]}
          handleMouseLeave={handleMouseLeave}
        />
      </BrowserRouter>
  );

  app.simulate(`mouseleave`);
  expect(handleMouseLeave).toHaveBeenCalledTimes(1);
});
