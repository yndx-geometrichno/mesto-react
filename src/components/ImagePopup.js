import React from "react";

export default function ImagePopup(props) {
  console.log(props);
  return (
    <div
      className={
        props.card.link
          ? `popup popup_type_photo popup_opened`
          : `popup popup_type_photo`
      }
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
