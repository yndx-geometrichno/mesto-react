import { useContext, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";

export default function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const avatarRef = useRef();
  const appContext = useContext(AppContext);

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="profile-pic-update"
      title="Обновить аватар"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={appContext.isLoading ? "Сохранение..." : "Сохранить"}
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
