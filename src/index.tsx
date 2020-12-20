import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import app from './app/App'

ReactDOM.render(
  <React.StrictMode>
    <App 
      handlers={app.UIProps.handlers}
      sequences={app.UIProps.sequences}
      soundNames={app.UIProps.soundNames}
      defaultEvent={app.UIProps.defaultEvent}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
