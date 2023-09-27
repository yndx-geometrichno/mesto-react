import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
    props.onClose();
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <>
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
            onChange={handleNameChange}
            defaultValue={name}
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
            onChange={handleDescriptionChange}
            defaultValue={description}
          />
          <span className="about-input-error popup__error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}
