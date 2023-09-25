import React from "react";

export default function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_photo ${
        props.card.link ? "popup_opened" : ""
      }`}
    >
      <div className="photo-popup">
        <img
          className="photo-popup__photo"
          src={props.card.link}
          alt={props.card.name}
        />
        <h2 className="photo-popup__header">{props.card.name}</h2>
        <button
          aria-label="Закрыть"
          type="button"
          className="photo-popup__close-btn popup__close-btn"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
