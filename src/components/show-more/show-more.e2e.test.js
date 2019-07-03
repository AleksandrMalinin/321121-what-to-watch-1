import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import ShowMore from './show-more.jsx';
import {constants} from '../../constants.js';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

const moviesLength = 60;
const moviesShown = constants.LIMIT_QUANTITY;

it(`On more-button click handler is being called`, () => {
  const mockFunction = jest.fn();
  const app = mount(
      <BrowserRouter>
        <ShowMore
          moviesLength={moviesLength}
          moviesShown={moviesShown}
          onMoreButtonClick={mockFunction}
        />
      </BrowserRouter>
  );

  const moreButton = app.find(`.catalog__button`);
  moreButton.simulate(`click`);
  expect(mockFunction).toHaveBeenCalledTimes(1);
});

it(`On more-button click returns correct film's quantity`, () => {
  const quantity = moviesLength >= moviesShown ? moviesShown : moviesLength;
  const mockFunction = jest.fn(() => moviesShown + quantity);
  const app = mount(
      <BrowserRouter>
        <ShowMore
          moviesLength={moviesLength}
          moviesShown={moviesShown}
          onMoreButtonClick={mockFunction}
        />
      </BrowserRouter>
  );

  const moreButton = app.find(`.catalog__button`);
  moreButton.simulate(`click`);
  expect(mockFunction).toHaveReturnedWith(40);
});
