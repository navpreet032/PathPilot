import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './redux/store'
import { Provider } from 'react-redux'
import Overlay from './overlay';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <StrictMode>
      <Overlay />
      <App />
    </StrictMode>
  </Provider>
);

