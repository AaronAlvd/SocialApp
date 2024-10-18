import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Modal, ModalProvider } from './context/modal.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModalProvider >
      <Modal />
      <App />
    </ModalProvider >
  </StrictMode>,
)
