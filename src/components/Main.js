import React from "react";
import { api } from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
}) {
  const [cards, setCards] = React.useState({});
  const userInfo = React.useContext(CurrentUserContext);

  React.useEffect(() => {
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

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container-avatar">
          <img
            className="profile__avatar"
            src={userInfo.avatar}
            alt="Фото профиля"
          />
          <button
            type="button"
            className="profile__edit-avatar-btn"
            aria-label="Редактировать изображение профиля"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__container">
          <div className="profile__container-info">
            <div className="profile__container-name">
              <h1 className="profile__name">{userInfo.name}</h1>
              <button
                type="button"
                className="profile__edit-btn"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__about">{userInfo.about}</p>
          </div>
          <button
            type="button"
            className="profile__add-pic-btn"
            aria-label="Добавить изображение"
            onClick={onAddPlace}
          ></button>
        </div>
      </section>
      <section className="cards">
        {Array.isArray(cards) &&
          cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              name={item.name}
              link={item.link}
              ownerId={item.owner._id}
              onCardClick={onCardClick}
            />
          ))}
      </section>
    </main>
  );
}
