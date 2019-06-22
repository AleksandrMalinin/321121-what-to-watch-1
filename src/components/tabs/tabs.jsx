import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {constants} from '../../constants.js';
import {getRatingLevel} from '../../utils.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import TabContent from '../tab-content/tab-content.jsx';

class Tabs extends PureComponent {
  constructor() {
    super();

    this.onTabSwitch = (genre) => this._onTabSwitch.bind(this, genre);
  }

  render() {
    const {movie, activeItem} = this.props;

    return <React.Fragment>
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {constants.TAB_NAMES.map((tabName, i) => <li className={`movie-nav__item ` + (activeItem === tabName ? `movie-nav__item--active` : ``)} key={i}>
            <a href="#" className="movie-nav__link" onClick={this.onTabSwitch(tabName)}>{tabName}</a>
          </li>)}
        </ul>
      </nav>

      <TabContent activeItem={activeItem} tabName={`Overview`}>
        <div className="movie-rating">
          <div className="movie-rating__score">{movie ? movie.rating : ``}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{movie ? getRatingLevel(movie.rating) : ``}</span>
            <span className="movie-rating__count">{movie ? movie.scores_count : ``} ratings</span>
          </p>
        </div>

        <div className="movie-card__text">
          <p>{movie ? movie.description : ``}</p>

          <p className="movie-card__director"><strong>{movie ? movie.director : ``}</strong></p>

          <p className="movie-card__starring"><strong>{movie ? movie.starring.join(`, `) : ``} and other</strong></p>
        </div>
      </TabContent>

      <TabContent activeItem={activeItem} tabName={`Details`}>
        <div className="movie-card__text movie-card__row">
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{movie ? movie.director : ``}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value">
                {movie ? movie.starring.join(`, `) : ``}
              </span>
            </p>
          </div>

          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{movie ? movie.running : ``}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{movie ? movie.genre : ``}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{movie ? movie.released : ``}</span>
            </p>
          </div>
        </div>
      </TabContent>

      <TabContent activeItem={activeItem} tabName={`Reviews`}>
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director&rsquo;s funniest and most exquisitely designed movies in years.</p>

                <footer className="review__details">
                  <cite className="review__author">Kate Muir</cite>
                  <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">8,9</div>
            </div>

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">Anderson&rsquo;s films are too precious for some, but for those of us willing to lose ourselves in them, they&rsquo;re a delight. &quot;The Grand Budapest Hotel&quot; is no different, except that he has added a hint of gravitas to the mix, improving the recipe.</p>

                <footer className="review__details">
                  <cite className="review__author">Bill Goodykoontz</cite>
                  <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                </footer>
              </blockquote>

              <div className="review__rating">8,0</div>
            </div>

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">I didn&rsquo;t find it amusing, and while I can appreciate the creativity, it&rsquo;s an hour and 40 minutes I wish I could take back.</p>

                <footer className="review__details">
                  <cite className="review__author">Amanda Greever</cite>
                  <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                </footer>
              </blockquote>

              <div className="review__rating">8,0</div>
            </div>
          </div>
          <div className="movie-card__reviews-col">
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.</p>

                <footer className="review__details">
                  <cite className="review__author">Matthew Lickona</cite>
                  <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">7,2</div>
            </div>

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

                <footer className="review__details">
                  <cite className="review__author">Paula Fleri-Soler</cite>
                  <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">7,6</div>
            </div>

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

                <footer className="review__details">
                  <cite className="review__author">Paula Fleri-Soler</cite>
                  <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">7,0</div>
            </div>
          </div>
        </div>
      </TabContent>
    </React.Fragment>;
  }

  _onTabSwitch(name, event) {
    event.preventDefault();
    this.props.onChange(name);
  }
}

Tabs.propTypes = {
  movie: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string,
    posterImage: PropTypes.string,
    previewImage: PropTypes.string,
    genre: PropTypes.string
  })),
  activeItem: PropTypes.string,
  onChange: PropTypes.func
};

export default withActiveItem(constants.DEFAULT_TAB)(Tabs);
