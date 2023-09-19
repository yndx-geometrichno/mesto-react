import React from "react";

export default function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
}) {
  return (
    <div
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
    >
      <div className="popup__container">
        <h2 className="popup__header">{title}</h2>
        <form
          name={name}
          action="#"
          method="get"
          className="popup__form popup__form-profile"
          noValidate
        >
          {children}
        </form>
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
