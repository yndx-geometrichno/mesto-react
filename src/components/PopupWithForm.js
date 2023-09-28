import React from "react";
import { AppContext } from "../contexts/AppContext";

export default function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onSubmit,
}) {
  const appContext = React.useContext(AppContext);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__header">{title}</h2>
        <form
          name={name}
          action="#"
          method="get"
          className="popup__form popup__form-profile"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" value="Сохранить" className="popup__save-btn">
            {title === "Вы уверены?"
              ? appContext.isLoading
                ? "Удаление..."
                : "Да"
              : appContext.isLoading
              ? "Сохранение..."
              : "Сохранить"}
          </button>
        </form>
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close-btn"
          onClick={appContext.closeAllPopups}
        ></button>
      </div>
    </div>
  );
}
