/* eslint camelcase: ["error", {properties: "never"}] */

export const films = [
  {
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    preview_image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Comedies`
  },
  {
    name: `Bohemian Rhapsody`,
    preview_image: `img/bohemian-rhapsody.jpg`,
    preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Crime`
  },
  {
    name: `Macbeth`,
    preview_image: `img/macbeth.jpg`,
    preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Documentary`
  },
  {
    name: `Aviator`,
    preview_image: `img/aviator.jpg`,
    preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Dramas`
  },
  {
    name: `We need to talk about Kevin`,
    preview_image: `img/we-need-to-talk-about-kevin.jpg`,
    preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Horror`
  }
];

export const comment = {
  id: 1,
  user: {
    id: 4,
    name: `Kate Muir`,
  },
  rating: 8.9,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  date: `2019-05-08T14:13:56.569Z`
};

export const defaultMovie = {
  background_color: `#AD9F8B`,
  background_image: `https://es31-server.appspot.com/wtw/static/film/background/Dardjeeling_Limited.jpg`,
  description: `A year after their father's funeral, three brothers travel across India by train in an attempt to bond with each other.`,
  director: `Wes Anderson`,
  genre: `Adventure`,
  id: 1,
  is_favorite: false,
  name: `Dardjeeling Limited`,
  poster_image: `https://es31-server.appspot.com/wtw/static/film/poster/Dardjeeling_Limited.jpg`,
  preview_image: `https://es31-server.appspot.com/wtw/static/film/preview/dardjeeling_limited.jpg`,
  preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: 3.6,
  released: 2007,
  run_time: 91,
  scores_count: 165106,
  starring: [`Owen Wilson`, `Adrien Brody`, `Jason Schwartzman`],
  video_link: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`
};
