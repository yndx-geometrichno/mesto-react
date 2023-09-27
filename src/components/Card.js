import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__like-btn ${
    isLiked && "card__like-btn_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteCard() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      {isOwn && <button type="button" className="card__delete-btn" onClick={handleDeleteCard} />}
      <img
        className="card__img"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__name">{props.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <div className="card__like-counter">{props.card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}
