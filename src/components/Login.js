import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from "../utils/auth";

export default function Login(props) {
  const history = useHistory();

  const [inputEmail, setInputEmail] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      auth.checkToken(token)
      .then((res) => {
        props.setLoggedIn(true);
        props.setHeaderEmail(res.data.email);
        history.push("./");
      })
      .catch((err) => {
        console.log(err);
      })
    }
  })

  const onLogin = (email, password) => {
    auth.authorize(email, password)
    .then((res) => {
      if(res.token) {
        localStorage.setItem("jwt", res.token);
        props.setHeaderEmail(email);
        setInputEmail("");
        setInputPassword("");
        props.setLoggedIn(true);
        history.push("./")
      }
    })
    .catch((err) => {
      console.log(err);
      setInputEmail("");
      setInputPassword("");
    })
  }

  return (
    <div className="authorization">
      <h1 className="authorization__title">Вход</h1>
      <form className="authorization__form" onSubmit={(evt) => {
        evt.preventDefault();

        onLogin(inputEmail, inputPassword);
      }}>
        <input required className="authorization__input" id="email" name="email" type="email" placeholder="Email"
        value={inputEmail} onChange={(evt) => setInputEmail(evt.target.value)} />
        <input required className="authorization__input" id="password" name="password" type="password" placeholder="Пароль"
        value={inputPassword} onChange={(evt) => setInputPassword(evt.target.value)} />
        <button type="submit" className="authorization__submit-button">Войти</button>
      </form>
    </div>
  )
}
