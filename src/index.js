import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {compose} from 'recompose';
import thunk from 'redux-thunk';
import reducer from './reducer';
import App from './components/app/app.jsx';
import {createAPI} from './api';
import {Operation} from "./reducer/data/data.js";
import {BrowserRouter} from "react-router-dom";

const api = createAPI((...args) => store.dispatch(...args));

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.dispatch(Operation.loadFilms());

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>,
    document.getElementById(`root`)
);
