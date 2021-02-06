import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { auth } from "../utils/auth";

export default function Register(props) {
  const history = useHistory();

  const [inputPassword, setInputPassword] = React.useState("");

  const [inputEmail, setInputEmail] = React.useState("");
  const onRegister = (email, password) => {
    auth.register(email, password)
    .then(() => {
      props.setRegister(true);
      props.openInfoTooltip(true);
      setInputEmail("");
      setInputPassword("");
      history.push("./sign-in");
    })
    .catch((err) => {
      props.setRegister(false);
      props.openInfoTooltip(true);
      console.log(err)
      setInputEmail("");
      setInputPassword("");
    })
  };

  return (
    <div className="authorization">
      <h1 className="authorization__title">Регистрация</h1>
      <form className="authorization__form" onSubmit={(evt) => {
        evt.preventDefault();

        onRegister(inputEmail, inputPassword);
      }} >
      <input required className="authorization__input" id="email" name="email" type="email" placeholder="Email"
        value={inputEmail} onChange={(evt) => setInputEmail(evt.target.value)} />
        <input required className="authorization__input" id="password" name="password" type="password" placeholder="Пароль"
        value={inputPassword} onChange={(evt) => setInputPassword(evt.target.value)} />
        <button type="submit" className="authorization__submit-button">Зарегистрироваться</button>
      </form>
      <Link to="./sign-in" className="authorization__signin-link">Уже зарегистрированы? Войти</Link>
    </div>
  )
}
