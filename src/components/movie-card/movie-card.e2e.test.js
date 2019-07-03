import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import MovieCard from './movie-card.jsx';
import {films} from '../../mocks/mocks.js';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

it(`On movie-card click handler is being called`, () => {
  const mockFunction = jest.fn();
  const app = mount(
      <BrowserRouter>
        <MovieCard
          movie={films[0]}
          onClick={mockFunction}
        />
      </BrowserRouter>
  );

  const link = app.find(`.small-movie-card__link`).first();
  link.simulate(`click`);

  expect(mockFunction).toHaveBeenCalledTimes(1);
});

it(`On movie-card mouseenter handler is being called`, () => {
  const mockFunction = jest.fn();
  const app = mount(
      <BrowserRouter>
        <MovieCard
          movie={films[0]}
          onMouseEnter={mockFunction}
        />
      </BrowserRouter>
  );

  app.simulate(`mouseenter`);
  expect(mockFunction).toHaveBeenCalledTimes(1);
});

it(`On movie-card mouseleave handler is being called`, () => {
  const mockFunction = jest.fn();
  const app = mount(
      <BrowserRouter>
        <MovieCard
          movie={films[0]}
          onMouseLeave={mockFunction}
        />
      </BrowserRouter>
  );

  app.simulate(`mouseleave`);
  expect(mockFunction).toHaveBeenCalledTimes(1);
});
