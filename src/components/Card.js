import React from 'react'

export default function Card(props) {

  function handleClick() {
    props.onCardClick(props.card)
  }

  return (
    <article className="card">
      <button type="button" className="card__delete-btn"></button>
      <img className="card__img" src={props.link} alt={props.name} onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__name">{props.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className="card__like-btn"
            aria-label="Нравится"
          ></button>
          <div className="card__like-counter"></div>
        </div>
      </div>
    </article>
  )
}
