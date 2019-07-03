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
  const onClick = jest.fn();
  const app = mount(
      <BrowserRouter>
        <ShowMore
          moviesLength={moviesLength}
          moviesShown={moviesShown}
          onMoreButtonClick={onClick}
        />
      </BrowserRouter>
  );

  const moreButton = app.find(`.catalog__button`);
  moreButton.simulate(`click`);
  expect(onClick).toHaveBeenCalledTimes(1);
});

it(`On more-button click returns correct film's quantity`, () => {
  const quantity = moviesLength >= moviesShown ? moviesShown : moviesLength;
  const onClick = jest.fn(() => moviesShown + quantity);
  const app = mount(
      <BrowserRouter>
        <ShowMore
          moviesLength={moviesLength}
          moviesShown={moviesShown}
          onMoreButtonClick={onClick}
        />
      </BrowserRouter>
  );

  const moreButton = app.find(`.catalog__button`);
  moreButton.simulate(`click`);
  expect(onClick).toHaveReturnedWith(40);
});
