import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";
import { AppContext } from "../contexts/AppContext";

export default function AddPlacePopup({ isOpen, onSubmitCard }) {
  const { values, handleChange, setValues } = useForm({});
  const appContext = useContext(AppContext);

  useEffect(() => {
    setValues({});
  }, [isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitCard({ name: values.cardName, link: values.url });
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={appContext.isLoading ? "Сохранение..." : "Сохранить"}
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
          value={values.cardName || ""}
          onChange={handleChange}
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
          value={values.url || ""}
          onChange={handleChange}
        />
        <span className="url-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
