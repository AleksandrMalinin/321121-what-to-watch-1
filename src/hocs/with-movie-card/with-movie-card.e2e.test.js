import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from "prop-types";
import withMovieCard from './with-movie-card.js';
import {constants} from '../../constants.js';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

const MockComponent = (props) => <div handleMouseEnter={props.handleMouseEnter}/>;

MockComponent.propTypes = {
  handleMouseEnter: PropTypes.func
};

const MockComponentWrapped = withMovieCard(MockComponent);

it(`On movie-card mouseenter state changes`, () => {
  const handleMouseEnter = jest.fn();
  const filmCard = mount(
      <MockComponentWrapped
        handleMouseEnter={handleMouseEnter}
      />
  );
  filmCard.simulate(`mouseEnter`);
  setTimeout(() => {
    expect(filmCard.state().isPlaying).toEqual(true);
  }, constants.TIMEOUT);
});