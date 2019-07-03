import React from 'react';
import renderer from 'react-test-renderer';
import FullVideoPlayer from './full-video-player.jsx';
import {defaultMovie} from '../../mocks/mocks.js';

it(`FullVideoPlayer correctly renders`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
  .create(<FullVideoPlayer
    movie={defaultMovie}
    handleClick={mockFunction}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
