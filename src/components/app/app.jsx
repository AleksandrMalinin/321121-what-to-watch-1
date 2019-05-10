import React from 'react';
import MainScreen from '../main-screen/main-screen.jsx';
import PropTypes from 'prop-types';

const App = (props) => {
  const {movies} = props;

  return <MainScreen
    movies={movies}
  />;
};

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    src: PropTypes.string.isRequired
  })).isRequired
};


export default App;
