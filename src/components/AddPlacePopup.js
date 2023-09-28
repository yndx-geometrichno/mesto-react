import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";

export default function AddPlacePopup({ isOpen, onSubmitCard }) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");
  const appContext = React.useContext(AppContext);

  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen])

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitCard({ name: cardName, link: cardLink });
    appContext.closeAllPopups();
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-container">
        <input
          id="cardName-input"
          type="text"
          name="cardName"
          className="popup__input popup__input_type_card-name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={cardName}
          onChange={handleCardNameChange}
        />
        <span className="cardName-input-error popup__error"></span>
      </label>
      <label className="popup__input-container">
        <input
          id="url-input"
          type="url"
          name="url"
          className="popup__input popup__input_type_url"
          placeholder="Ссылка на картинку"
          required
          value={cardLink}
          onChange={handleCardLinkChange}
        />
        <span className="url-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
