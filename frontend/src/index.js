import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
//import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

import { positions, transitions, Provider as ErrorProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
};

ReactDOM.render(
  <Provider store={store}>
    <ErrorProvider template={AlertTemplate} {...options}>
      <App />
    </ErrorProvider>
  </Provider>,
  document.getElementById('root')
);

//serviceWorker.unregister();
