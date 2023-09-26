import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';


export default function EditAvatarPopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [avatar, setAvatar] = React.useState('');

  const avatarRef = React.useRef();

  React.useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    props.onClose();
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="profile-pic-update"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-container">
        <input
          id="url-avatar-input"
          type="url"
          name="avatar"
          className="popup__input popup__input_type_url"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span className="url-avatar-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  )
}
