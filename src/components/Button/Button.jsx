import "./Button.css";

const Button = ({
  id,
  text,
  buttonClass = "",
  icon,
  clickFuntion,
  formSubmit,
  rotateIcon,
}) => {
  return (
    <button
      id={id}
      className={`Button ${buttonClass}`}
      onClick={clickFuntion}
      type={formSubmit ? "submit" : "button"}
    >
      {icon && (
        <img
          src={icon}
          className={rotateIcon ? "buttonIcon rotateLoad" : "buttonIcon"}
          alt="button icon"
        />
      )}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;