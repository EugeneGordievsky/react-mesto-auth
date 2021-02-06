import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup(props) {
  const nameRef = React.createRef();
  const linkRef = React.createRef();

  return (
    <PopupWithForm name = "popup_add-card" title = "Новое место" isOpen = {props.isOpen}
    onClose = {props.onClose} buttonText = "Создать" onSubmit={(evt) => {
      evt.preventDefault();

      props.onAddPlace({
        name: nameRef.current.value,
        link: linkRef.current.value
      })
    }} >
      <input id="input-title" type="text" placeholder="Название" className="popup__input popup__input_title"
      name="name" minLength={2} maxLength={30} required ref={nameRef} />
      <span id="input-title-error" className="popup__input_error"></span>
      <input id="input-src" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_src"
      name="link" required ref={linkRef} />
      <span id="input-src-error" className="popup__input_error"></span>
    </PopupWithForm>
  )
}
