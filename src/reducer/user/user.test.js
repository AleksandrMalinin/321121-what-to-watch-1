import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {ACTION_TYPE, Operation} from "./user.js";
import {defaultMovie} from '../../mocks/mocks.js';

const email = `meow@gmail.com`;
const password = `meowmeow`;
const rating = 1;
const review = `shit!`;

it(`Should make a correct API call to /login`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const dataSender = Operation.loginUser(email, password);

  apiMock
    .onPost(`/login`)
    .reply(200, [{fake: true}]);

  return dataSender(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ACTION_TYPE.setAuthorizationStatus,
        payload: false,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ACTION_TYPE.authorizeUser,
        payload: [{fake: true}],
      });
    });
});

it(`Should make a correct API call to /login`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const userLoader = Operation.setUser();

  apiMock
    .onGet(`/login`)
    .reply(200, [{fake: true}]);

  return userLoader(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ACTION_TYPE.setAuthorizationStatus,
        payload: false,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ACTION_TYPE.setUser,
        payload: [{fake: true}],
      });
    });
});

it(`Should make a correct API call to /comments/:id`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const reviewSender = Operation.addReview(defaultMovie.id, review, rating);

  apiMock
    .onPost(`/comments/${defaultMovie.id}`)
    .reply(200, [{fake: true}]);

  return reviewSender(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ACTION_TYPE.addReview,
        payload: [{fake: true}],
      });
    });
});

it(`Should make a correct API call to /comments/:id`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const commentsLoader = Operation.loadComments(defaultMovie.id);

  apiMock
    .onGet(`/comments/${defaultMovie.id}`)
    .reply(200, [{fake: true}]);

  return commentsLoader(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ACTION_TYPE.loadComments,
        payload: [{fake: true}],
      });
    });
});
