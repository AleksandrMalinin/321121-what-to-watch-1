import {reducer} from './reducer.js';
import {films} from './mocks/films.js';

it(`Reducer without additional parameters returns initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    moviesList: films,
    activeGenre: `All genres`
  });
});

it(`Reducer returns active genre according to filter`, () => {
  expect(reducer(
      {
        moviesList: films,
        activeGenre: `All genres`
      },
      {
        type: `CHANGE_FILTER_GENRE`,
        payload: `Dramas`
      }
  )
  ).toEqual({
    moviesList: films,
    activeGenre: `Dramas`
  });
});

it(`Reducer returns movies list according to filter`, () => {
  expect(reducer(
      {
        moviesList: films,
        activeGenre: `Horror`
      },
      {
        type: `GET_MOVIES_LIST`,
        payload: films.filter((film) => film.genre === `Horror`)
      }
  )
  ).toEqual({
    moviesList: films.filter((film) => film.genre === `Horror`),
    activeGenre: `Horror`
  });
});
