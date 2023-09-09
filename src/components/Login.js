import React from "react";
import AuthForm from "./AuthForm";
import { auth } from "../utils/Auth";
import AuthLogoError from '../images/logo/AuthLogoError.svg'
import { useNavigate } from "react-router-dom";


function Login(props) {

  const navigate = useNavigate();

  function loginError() {
    props.setLogo(AuthLogoError)
    props.setText('Что-то пошло не так! Попробуйте ещё раз.')
    props.onInfoTooltip()
  }

  function login(e) {
    e.preventDefault();
    auth.login(props.email, props.password)
    .then((data) => {
      props.handleLogin()
      navigate('/')
      props.resetForm();
      localStorage.setItem('token', data.token);
      auth.checkToken(data.token)
      .then((data) => {
        props.getEmail(data.data.email)
      })
      .catch((err) => {
        console.log(err)
      })
    })
    .catch(() => {
      loginError()
      props.resetForm();
    })
  }

  return (
    <div>
      <AuthForm title='Вход' buttonText='Войти' onSubmit={login} onClose={props.onClose}>
        <label className="authform__item">
          <input className="authform__input" placeholder="Email" value={props.email} onChange={props.onEmailChange} />
        </label>
        <label className="authform__item">
          <input className="authform__input " type="password"  placeholder="Пароль" value={props.password} onChange={props.onPasswordChange} />
        </label>
        <button
          type="submit"
          className="authform__button"
        >
          Войти
        </button>
      </AuthForm>
    </div>
  );
}

export default Login;