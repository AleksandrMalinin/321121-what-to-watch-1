import React from 'react';
import MainScreen from '../main-screen/main-screen.jsx';
import PropTypes from 'prop-types';

const App = (movieTitlesArray) => {
  const {movieTitles} = movieTitlesArray;

  return <MainScreen
    movieTitles={movieTitles}
  />;
};

App.propTypes = {
  movieTitles: PropTypes.arrayOf(PropTypes.string)
};

export default App;
