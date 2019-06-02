import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-active-item.js';
import {films} from '../mocks/films.js';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWrapped = withActiveItem(films[0].genre)(MockComponent);

it(`Should change activeItem when callback is being called`, () => {
  const wrapper = shallow(<MockComponentWrapped/>);

  wrapper.instance().onItemChange(films[2].genre);
  expect(wrapper.state().activeItem).toEqual(films[2].genre);
});
