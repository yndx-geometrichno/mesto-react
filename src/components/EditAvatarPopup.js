import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";

export default function EditAvatarPopup(props) {
  const appContext = React.useContext(AppContext);
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    appContext.closeAllPopups();
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="profile-pic-update"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-container">
        <input
          id="url-avatar-input"
          type="url"
          name="avatar"
          className="popup__input popup__input_type_url"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span className="url-avatar-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
