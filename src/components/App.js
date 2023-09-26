import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  // const card = {name: 'test', link: 'https://avatars.mds.yandex.net/get-mpic/4448884/img_id6574022576475682573.jpeg/orig'}
  // api.addNewCard(card).then((res) => {
  //   console.log('added', 'res: '+ res);
  // })

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
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card, setCards) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id && c));
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

  function handleUpdateUser(userInfo) {
    console.log(userInfo)
    api.updateUserInfo(userInfo).then((res) => {
      setCurrentUser(res);
    });
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
            onCardDelete={handleCardDelete}
          />
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
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
