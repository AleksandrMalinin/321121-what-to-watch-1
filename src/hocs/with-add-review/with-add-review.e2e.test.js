import React from 'react';
import Enzyme, {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import Adapter from 'enzyme-adapter-react-16';
import reducer from '../../reducer';
import withAddReview from './with-add-review.js';
import {defaultMovie, comment} from '../../mocks/mocks.js';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

const mockStore = createStore(reducer);

const MockComponent = () => <div/>;
const MockComponentWrapped = withAddReview(MockComponent);

it(`Should return callback on submit event`, () => {
  const onPostReview = jest.fn();
  const defaultProps = {
    match: {params: {code: 123}},
  };
  const wrapper = mount(
      <Provider store={mockStore}>
        <BrowserRouter>
          <MockComponentWrapped {...defaultProps} onSubmit={onPostReview(defaultMovie.id, comment.comment, comment.rating)}/>
        </BrowserRouter>
      </Provider>);

  wrapper.simulate(`submit`);
  expect(onPostReview).toHaveBeenCalledTimes(1);
  expect(onPostReview).toHaveBeenCalledWith(defaultMovie.id, comment.comment, comment.rating);
});
