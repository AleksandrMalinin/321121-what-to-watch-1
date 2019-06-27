import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {ACTION_TYPE, Operation} from "./data.js";

it(`Should make a correct API call to /films/promo`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const fimlLoader = Operation.loadPromoFilm();

  apiMock
    .onGet(`/films/promo`)
    .reply(200, [{fake: true}]);

  return fimlLoader(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ACTION_TYPE.loadPromoFilm,
        payload: [{fake: true}],
      });
    });
});

it(`Should make a correct API call to /films`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const fimlsLoader = Operation.loadFilms();

  apiMock
    .onGet(`/films`)
    .reply(200, [{fake: true}]);

  return fimlsLoader(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ACTION_TYPE.loadFilms,
        payload: [{fake: true}],
      });
    });
});
