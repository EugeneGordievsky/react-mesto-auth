import logo from '../images/logo.svg';
import { Link, useHistory } from 'react-router-dom';

export default function Header(props) {
  const history = useHistory();

  const onSignOut = () => {
    props.setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("./sign-in");
  }
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип Mesto Russia" />
      {props.loggedIn ? <>
        <p className="header__email">{props.headerEmail}</p>
        <button className="header__link header__link_main" onClick={onSignOut}>Выйти</button>
      </> : <>
        <Link to={props.link} className="header__link" >{props.linkText}</Link>
      </>}
    </header>
  )
}
