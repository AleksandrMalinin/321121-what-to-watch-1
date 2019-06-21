export const getRatingLevel = function (rating) {
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
