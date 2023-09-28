import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState({});

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        const cardArray = Object.values(res);
        setCards(cardArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
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

  function handleDeleteCardClick(card) {
    setDeleteCardPopupOpen(true);
    setCardToDelete(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard({});
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.err)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleProfileSubmit(inputValues) {
    function makeRequset() {
      return api.updateUserInfo(inputValues).then(setCurrentUser);
    }

    handleSubmit(makeRequset);
  }

  function handleAvatarSubmit(inputValues) {
    function makeRequest() {
      return api.updateAvatar(inputValues).then(setCurrentUser);
    }

    handleSubmit(makeRequest);
  }

  function handleCardSubmit(inputValues) {
    function makeRequest() {
      return api.addNewCard(inputValues).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    }

    handleSubmit(makeRequest);
  }

  function handleDeleteCardSubmit() {
    function makeRequest() {
      return api.deleteCard(cardToDelete._id).then(() => {
        setCards((state) =>
          state.filter((c) => c._id !== cardToDelete._id && c)
        );
      });
    }

    handleSubmit(makeRequest);
  }

  return (
    <AppContext.Provider value={{ isLoading, onClose: closeAllPopups }}>
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
              onCardDelete={handleDeleteCardClick}
              cards={cards}
            />
            <Footer />
          </div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleProfileSubmit}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onSubmitCard={handleCardSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleAvatarSubmit}
          />
          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onCardDelete={handleDeleteCardSubmit}
          />
          <ImagePopup card={selectedCard} />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
