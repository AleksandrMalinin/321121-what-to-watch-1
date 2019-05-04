import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  const movieTitlesArray = [
    `Fantastic Beasts: The Crimes of Grindelwald`,
    `Bohemian Rhapsody`,
    `Macbeth`,
    `Aviator`
  ];

  ReactDOM.render(
      <App
        movieTitles={movieTitlesArray}
      />,
      document.querySelector(`body`)
  );
};

init();
