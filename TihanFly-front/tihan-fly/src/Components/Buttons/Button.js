import "../../Styles/Button.css"
const Button = ({onClick,children}) => {

    return (
        <button onClick={onClick} className="button-component"><b>{children}</b></button>
    );
}
export default Button