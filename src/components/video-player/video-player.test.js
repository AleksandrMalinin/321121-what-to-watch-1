import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';
import {films} from '../../mocks/films.js';

const isPlaying = false;

it(`VideoPlayer correctly renders`, () => {

  const tree = renderer
  .create(<VideoPlayer
    poster={films[0].poster}
    preview={films[0].preview}
    isPlaying={isPlaying}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
