import React from 'react';
//styles
import "./Button.css";

const Button = ({ id,text, buttonClass, icon, clickFuntion, formSubmit, rotateIcon}) => {
    return (
        <button 
            id={id}
            className={`Button ${buttonClass}`} 
            onClick={clickFuntion}
            type={formSubmit ? "submit" : "button"}>
            {icon ? <img src={icon} className={rotateIcon ? 'buttonIcon rotateLoad' : 'buttonIcon'} /> : null}
            {text ? <span>{text}</span> : null} 
            {icon && <img src={icon} className={rotateIcon ? "rotateLoad" : ""} />}
      {text}
        </button>
    );
};

export default Button;