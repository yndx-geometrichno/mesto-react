import React from "react";
import { api } from "../utils/Api";
import Card from "./Card";

export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState("name");
  const [userDescription, setUserDescription] = React.useState("about");
  const [userAvatar, setUserAvatar] = React.useState("avatar");
  const [cards, setCards] = React.useState({});
  
  React.useEffect(() => {
    api.getUserInfo().then((res) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    });
  }, []);
  
  const mapCards = (cards) => {
    return cards.map((item) => ({
      id: item._id,
      name: item.name,
      link: item.link,
      ownerId: item.owner._id,
    }));
  };

  React.useEffect(() => {
    api.getInitialCards().then((res) => {
      const cardArray = Object.values(res);
      setCards(mapCards(cardArray));
    });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container-avatar">
          <img
            className="profile__avatar"
            src={userAvatar}
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
              <h1 className="profile__name">{userName}</h1>
              <button
                type="button"
                className="profile__edit-btn"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__about">{userDescription}</p>
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
        {Array.isArray(cards) && cards.map((item) => (
          <Card
            key={item.id}
            card={item}
            name={item.name}
            link={item.link}
            ownerId={item.ownerId}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}
