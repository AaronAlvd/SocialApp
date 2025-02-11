import { useRef, createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './modal.css'

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const messageRef = useRef();
  const [messageContent, setMessageContent] = useState(null);
  const [onMessageClose, setOnMessageClose] = useState(null);

  const closeModal = () => {
    setMessageContent(null);
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose();
    }

    if (typeof onMessageClose === "function") {
      setOnMessageClose(null)
      onMessageClose();
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    messageRef,
    messageContent, 
    closeModal,
    setMessageContent,
    setOnMessageClose,
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function to be called when modal is closing
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
      <div ref={messageRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}

export function Modal2() {
  const { messageRef, messageContent, closeModal } = useContext(ModalContext);
  // If there is no div referenced by the modalRef or messageContent is not a
  // truthy value, render nothing:
  if (!messageRef || !messageRef.current || !messageContent) return null;

  setTimeout(() => {
    closeModal()
  }, 3500)

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal-message">
      <div id="modal-content_message">{messageContent}</div>
    </div>,
    messageRef.current
  );
}


export const useModal = () => useContext(ModalContext);