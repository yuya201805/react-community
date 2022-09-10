import React from 'react';
import { render }from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './reducks/store/store';
import * as History from 'history';
import App from './App';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider } from '@material-ui/core';
import {theme} from "./assets/theme"
import './assets/reset.css'
import './assets/style.css'

// connected-react-router - action経由でルーティングが可能、push,replace..
// historyを強化
const history = History.createBrowserHistory();
export const store = createStore(history);

render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <App/>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
)

// serviceWorker.register();