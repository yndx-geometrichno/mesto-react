import React from "react";
import { AppContext } from "../contexts/AppContext";

export default function ImagePopup(props) {

  const appContext = React.useContext(AppContext);

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
          onClick={appContext.closeAllPopups}
        ></button>
      </div>
    </div>
  );
}
