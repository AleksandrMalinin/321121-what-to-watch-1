import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainScreen from './main-screen.jsx';

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

const props = {
  movieTitles: [
    `Fantastic Beasts: The Crimes of Grindelwald`,
    `Bohemian Rhapsody`,
    `Macbeth`,
    `Aviator`
  ]
};


it(`Movie title click correctly works`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<MainScreen
    {...props}
    onClick={clickHandler}
  />);

  const link = app.find(`.small-movie-card__link`).first();
  link.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
