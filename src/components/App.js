import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
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
              />
              <span className="about-input-error popup__error"></span>
            </label>
            <input
              type="submit"
              value="Сохранить"
              className="popup__save-btn popup__save-btn_type_disabled"
              disabled
            />
          </>
        }
      />
      <PopupWithForm
        name="card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
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
              />
              <span className="url-input-error popup__error"></span>
            </label>
            <input
              type="submit"
              value="Сохранить"
              className="popup__save-btn popup__save-btn_type_disabled"
              disabled
            />
          </>
        }
      />
      <PopupWithForm
        name="profile-pic-update"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <label className="popup__input-container">
              <input
                id="url-avatar-input"
                type="url"
                name="avatar"
                className="popup__input popup__input_type_url"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="url-avatar-input-error popup__error"></span>
            </label>
            <input
              type="submit"
              value="Сохранить"
              className="popup__save-btn popup__save-btn_type_disabled"
              disabled
            />
          </>
        }
      />
      <PopupWithForm
        name="delete-card-confirmation"
        title="Вы уверены?"
        onClose={closeAllPopups}
        children={
          <>
            <input
              type="submit"
              value="Да"
              className="popup__save-btn popup__confirm-btn"
            />
          </>
        }
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
