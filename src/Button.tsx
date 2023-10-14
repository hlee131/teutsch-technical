import { Ref, forwardRef } from "react";

interface ButtonProps {
    value: string,
    onClick: (value: string) => void
}

const Button = forwardRef(function Button({value, onClick}: ButtonProps, ref: Ref<HTMLButtonElement>) {
    return <button ref={ref} onClick={() => onClick(value)} className="calculator-button" tabIndex={-1}>
        {value}
    </button>
})

export default Button; 