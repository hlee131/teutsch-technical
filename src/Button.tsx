import { Ref, forwardRef } from "react";
import { OPERATORS, ACTIONS } from "./App";

interface ButtonProps {
    value: string,
    onClick: (value: string) => void
}

// component for each button on the calculator
const Button = forwardRef(function Button({value, onClick}: ButtonProps, ref: Ref<HTMLButtonElement>) {
    return <button ref={ref} onClick={() => onClick(value)} tabIndex={-1}
                    className={`${OPERATORS.includes(value) ? "operator" : ""} 
                                ${ACTIONS.includes(value) ? "action" : ""} calculator-button`}>
        {value}
    </button>
})

export default Button; 