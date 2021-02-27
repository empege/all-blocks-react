import React, { useState } from 'react'
import './modal.css'
import { modalData } from '../../data'

const Modal = ({ theme, enterStyle }) => {

  const [showModal, setShowModal] = useState(true);

  if (showModal) {
    return (
      <div className={`modal modal--theme--${theme} modal--active--${enterStyle}`}>
        <div className="modal__background" onClick={() => setShowModal(!showModal)}></div>
        <div className="modal__inner">
          <header className="modal__header">
            <h1 className="modal__title">{modalData.title}</h1>
            <button className="modal__exit-button" onClick={() => setShowModal(!showModal)}><i className="fas fa-times"></i>
            </button>
          </header>
          <div className="modal__paragraph">{modalData.text}</div>
          <footer className="modal__footer">
            <button className="button modal__button">Accept</button>
            <button className="button modal__button">Decline</button>
          </footer>
        </div>
      </div>
    )
  }
  return ''
}

export default Modal
