import "./Button.css";

type buttonProps = {
  click?: () => void;
  btnName: string;
};

const Button = (props: buttonProps) => {
  return (
    <div className="button">
      <button onClick={() => props.click}>{props.btnName}</button>
    </div>
  );
};

export default Button;
