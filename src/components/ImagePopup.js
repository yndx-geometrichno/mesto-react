import React from 'react'

export default function ImagePopup() {
  return (
    <div className="popup popup_type_photo">
      <div className="photo-popup">
        <img className="photo-popup__photo" />
        <h2 className="photo-popup__header"></h2>
        <button
          aria-label="Закрыть"
          type="button"
          className="photo-popup__close-btn popup__close-btn"
        ></button>
      </div>
    </div>
  )
}
