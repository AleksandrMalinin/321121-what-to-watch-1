export const getRatingLevel = (rating) => {
  const ratingRounded = Math.floor(rating);

  switch (true) {
    case (ratingRounded < 3):
      return `bad`;

    case (ratingRounded >= 3 && ratingRounded < 5):
      return `normal`;

    case (ratingRounded >= 5 && ratingRounded < 8):
      return `good`;

    case (ratingRounded >= 8 && ratingRounded < 10):
      return `very good`;

    case (ratingRounded === 10):
      return `awesome`;

    default:
      return `no rank`;
  }
};

export const getElapsedTime = (time) => {
  let totalSeconds = time;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  const formateTime = [hours, minutes, seconds].map((el) => {
    if (el < 10) {
      el = `0` + el;
    }

    return el;
  }).join(`:`);

  return formateTime;
};

export const changeFavouriteStatus = (state, movie) => {
  const movieListUpdated = state.moviesList.filter((film) => film.id !== movie.id);

  if (state.moviePromo.id === movie.id) {
    state.moviePromo[`is_favorite`] = !state.moviePromo[`is_favorite`];
  }

  return movieListUpdated;
};

export const isCorrectLength = (length, min, max) => {
  return length > min && length <= max;
};

export const formateDate = (date) => {
  const monthNames = [
    `January`, `February`, `March`,
    `April`, `May`, `June`, `July`,
    `August`, `September`, `October`,
    `November`, `December`
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
};
