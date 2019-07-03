import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import MovieCard from './movie-card.jsx';
import {films} from '../../mocks/mocks.js';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

it(`On movie-card click handler is being called`, () => {
  const onClick = jest.fn();
  const app = mount(
      <BrowserRouter>
        <MovieCard
          movie={films[0]}
          onClick={onClick}
        />
      </BrowserRouter>
  );

  const link = app.find(`.small-movie-card__link`).first();
  link.simulate(`click`);

  expect(onClick).toHaveBeenCalledTimes(1);
});

it(`On movie-card mouseenter handler is being called`, () => {
  const onMouseEnter = jest.fn();
  const app = mount(
      <BrowserRouter>
        <MovieCard
          movie={films[0]}
          onMouseEnter={onMouseEnter}
        />
      </BrowserRouter>
  );

  app.simulate(`mouseenter`);
  expect(onMouseEnter).toHaveBeenCalledTimes(1);
});

it(`On movie-card mouseleave handler is being called`, () => {
  const onMouseLeave = jest.fn();
  const app = mount(
      <BrowserRouter>
        <MovieCard
          movie={films[0]}
          onMouseLeave={onMouseLeave}
        />
      </BrowserRouter>
  );

  app.simulate(`mouseleave`);
  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});
