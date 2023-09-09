import React from "react";
import AuthForm from "./AuthForm";
import { useState } from "react";
import { auth } from "../utils/Auth";
import AuthLogoSucces from '../images/logo/AuthLogoSucces.svg'
import AuthLogoError from '../images/logo/AuthLogoError.svg'

function Register(props) {
  const [regText, setRegText] = useState('')
  const [regLogo, setRegLogo] = useState('')

  function registerSucces() {
    setRegText('Вы успешно зарегистрировались!')
    setRegLogo(AuthLogoSucces)
    props.onInfoTooltip()
  }

  function registerError() {
    setRegLogo(AuthLogoError)
    setRegText('Что-то пошло не так! Попробуйте ещё раз.')
    props.onInfoTooltip()
  }

  function registration(e) {
    e.preventDefault();
    auth.register(props.email, props.password)
    .then(() => {
      registerSucces()
      props.resetForm();
    })
    .catch(() => {
      registerError()
      props.resetForm();
    })
  }

  return (
    <div>
      <AuthForm title='Регистрация' buttonText='Зарегистрироваться' onSubmit={registration} onClose={props.onClose} isOpen={props.isOpen} toolTipText={regText} toolTipLogo={regLogo}>
          <label className="authform__item">
            <input className="authform__input" placeholder="Email" value={props.email} onChange={props.onEmailChange} />
          </label>
          <label className="authform__item">
            <input className="authform__input " type="password" placeholder="Пароль" value={props.password} onChange={props.onPasswordChange} />
          </label>
          <button
            type="submit"
            className="authform__button"
          >
            Зарегистрироваться
          </button>
        <button 
          onClick={props.sign}
          type="button" 
          className="authform__skip-button">Уже зарегистрированы? Войти</button>
      </AuthForm>
    </div>
  );
}

export default Register;