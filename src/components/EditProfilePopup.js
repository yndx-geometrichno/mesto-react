import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";
import { AppContext } from "../contexts/AppContext";

export default function EditProfilePopup({ isOpen, onUpdateUser }) {
  const { values, handleChange, setValues } = useForm({});
  const currentUser = useContext(CurrentUserContext);
  const appContext = useContext(AppContext);

  useEffect(() => {
    setValues({ profileName: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.profileName,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={appContext.isLoading ? "Сохранение..." : "Сохранить"}
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
          value={values.profileName || ""}
          onChange={handleChange}
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
          value={values.about || ""}
          onChange={handleChange}
        />
        <span className="about-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
