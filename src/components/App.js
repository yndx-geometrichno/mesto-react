import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card, setCards) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      console.log(newCard)
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
          />
          <Footer />
        </div>
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
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
          </>
        </PopupWithForm>
        <PopupWithForm
          name="card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
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
        </PopupWithForm>
        <PopupWithForm
          name="profile-pic-update"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
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
        </PopupWithForm>
        <PopupWithForm
          name="delete-card-confirmation"
          title="Вы уверены?"
          onClose={closeAllPopups}
        >
          <input
            type="submit"
            value="Да"
            className="popup__save-btn popup__confirm-btn"
          />
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
