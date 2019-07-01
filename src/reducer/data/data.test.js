import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {ACTION_TYPE, Operation} from "./data.js";
import {defaultMovie} from '../../mocks/mocks.js';

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

it(`Should make a correct API call to /favorite`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const favoriteFimlsLoader = Operation.loadFavouriteFilms();

  apiMock
    .onGet(`/favorite`)
    .reply(200, [{fake: true}]);

  return favoriteFimlsLoader(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ACTION_TYPE.loadFavouriteFilms,
        payload: [{fake: true}],
      });
    });
});

it(`Should make a correct API call to /favorite/:id/:status`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const status = 1;
  const statusSender = Operation.changeFavouriteStatus(defaultMovie.id, defaultMovie.is_favorite);

  apiMock
    .onPost(`/favorite/${defaultMovie.id}/${status}`)
    .reply(200, [{fake: true}]);

  return statusSender(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ACTION_TYPE.changeFavouriteStatus,
        payload: [{fake: true}],
      });
    });
});
