import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {ACTION_TYPE, Operation} from "./user.js";
import {defaultMovie} from '../../mocks/mocks.js';

const rating = 1;
const review = `shit!`;

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
