import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import configureStore from './store/store.js';
import { restoreCSRF, csrfFetch } from './store/csrf.js';
import * as sessionActions from './store/session.js';
import { ModalProvider, Modal, Modal2 } from './context/modal.jsx';
import './index.css';

(async () => {
  const store = configureStore();

  // Make the store accessible in the browser console
  window['store'] = store;

  if (import.meta.env.MODE !== 'production') {
    restoreCSRF();

    window.csrfFetch = csrfFetch;
    window.store = store;
    window.sessionActions = sessionActions;
  }

  // Render the application once the store is ready
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ModalProvider>
        <Provider store={store}>
          <App/>
          <Modal />
          <Modal2 />
        </Provider>
      </ModalProvider>
    </React.StrictMode>
  );
})();
