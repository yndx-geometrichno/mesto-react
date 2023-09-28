import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";

export default function EditProfilePopup({ isOpen, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);
  const appContext = React.useContext(AppContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
    appContext.closeAllPopups();
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-container">
        <input
          id="profileName-input"
          type="text"
          name="profileName"
          className="popup__input popup__input_type_profile-name"
          placeholder="Ваше имя"
          required
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="profileName-input-error popup__error"></span>
      </label>
      <label className="popup__input-container">
        <input
          id="about-input"
          type="text"
          name="about"
          className="popup__input popup__input_type_about"
          placeholder="Ваша профессия"
          required
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="about-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
