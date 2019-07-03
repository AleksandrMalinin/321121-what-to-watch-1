import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withMovieCard from './with-movie-card.js';
import {constants} from '../../constants.js';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWrapped = withMovieCard(MockComponent);

it(`On movie-card mouseenter state changes`, () => {
  const onMouseEnter = jest.fn();
  const filmCard = mount(
      <MockComponentWrapped
        onMouseEnter={onMouseEnter}
      />
  );

  filmCard.simulate(`mouseenter`);
  setTimeout(() => {
    expect(filmCard.state().isPlaying).toEqual(true);
  }, constants.TIMEOUT);
});
