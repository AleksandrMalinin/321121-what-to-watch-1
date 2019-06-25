import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';
import {films} from '../../mocks/mocks.js';

const isPlaying = false;

it(`VideoPlayer correctly renders`, () => {

  const tree = renderer
  .create(<VideoPlayer
    poster={films[0].preview_image}
    link={films[0].preview_video_link}
    isPlaying={isPlaying}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
