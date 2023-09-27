import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onSubmitCard }) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  // React.useEffect(() => {
  //   setCardName()
  // })

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitCard({ name: cardName, link: cardLink });
    onClose();
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
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
          onChange={handleCardLinkChange}
        />
        <span className="url-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
