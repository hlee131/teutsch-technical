import { Ref, forwardRef } from "react";
import { OPERATORS, ACTIONS } from "./App";

interface ButtonProps {
    value: string,
    onClick: (value: string) => void
}

const Button = forwardRef(function Button({value, onClick}: ButtonProps, ref: Ref<HTMLButtonElement>) {
    return <button ref={ref} onClick={() => onClick(value)} className={`${OPERATORS.includes(value) ? "operator" : ""} ${ACTIONS.includes(value) ? "action" : ""} calculator-button`} tabIndex={-1}>
        {value}
    </button>
})

export default Button; 