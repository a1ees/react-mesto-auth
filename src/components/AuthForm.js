import React from "react";
import InfoTooltip from "./InfoTooltip";

function AuthForm(props) {
  return (
    <section className='authform'>
      <div className="authform__container">
        <h2 className='authform__title'>{props.title}</h2>
        <form onSubmit={props.onSubmit} className="authform__form">
          {props.children}
        </form>
      </div>
      <InfoTooltip onClose={props.onClose} isOpen={props.isOpen} toolTipText={props.toolTipText} toolTipLogo={props.toolTipLogo} />
    </section>
  );
}

export default AuthForm;