import "./App.css";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import calculate from "./calculate";

export const OPERATORS = ["+", "-", "*", "/", "^"];

/**
 * Calculates the square root of a number.
 *
 * @param x the number to calculate the root of.
 * @returns the square root if `x` is non-negative or `NaN` if `x` is negative.
 */
function App() {
  const [expression, setExpression] = useState<string[]>([]);
  const [showingAns, setShowingAns] = useState(false); 

  const buttons = ["1", "2", "3", "/",
                   "4", "5", "6", "*",
                   "7", "8", "9", "-",
                   "0", "(", ")", "+", 
                   ".", "^", "C", "="];

  const buttonRefs = useRef<{[button: string]: HTMLButtonElement}>({}); 
  
  /**
 * Calculates the square root of a number.
 *
 * @param x the number to calculate the root of.
 * @returns the square root if `x` is non-negative or `NaN` if `x` is negative.
 */
  const onClick = (value: string) => {
    switch (value) {
      case "C": 
        setExpression([]); 
        setShowingAns(false);
        break;
      case "=":
        setExpression((prev) => [calculate(toString(prev))]); 
        setShowingAns(true);
        break;
      default: 
        setExpression((prev) => showingAns ? [value] : [...prev, value]); 
        setShowingAns(false);
        break;
    }
  }

  const toString = (tokens: string[]) => {
    let string = "";
    tokens.forEach((value, i) => {
      const space = OPERATORS.includes(value) ? " " : ""; 
      switch (value) {
        case "-":
          string += OPERATORS.includes(tokens[i - 1]) || tokens[i - 1] === undefined ? "-" : " - "; 
          break;
        case "(":
          string += "( "; break;
        case ")":
          string += " )"; break; 
        default: 
          string += `${space}${value}${space}`; break;
      }
    })
    return string; 
  }
  
  useEffect(() => { 
    
    const onKeyDown = (event: KeyboardEvent) => {
      if (Object.keys(buttonRefs.current).includes(event.key)) {
        event.preventDefault(); event.stopPropagation();
        const ele = buttonRefs.current[event.key]; 
        ele.click(); 
        ele.classList.add("button-clicked"); 
        setTimeout(() => {
            ele.classList.remove("button-clicked");
        }, 150);
      } else if (event.key === "Backspace") {
        event.preventDefault(); event.stopPropagation();
        setExpression((prev) => prev.slice(0, -1) );
      }
    }

    document.addEventListener("keydown", onKeyDown); 
    return () => document.removeEventListener("keydown", onKeyDown); 
  }, [])

  // add some more mappings to keydown so that it is more intuitive
  useEffect(() => {
    const mappings = { "Enter": "=", "c": "C", "x": "*" };

    for (const [key, value] of Object.entries(mappings)) {
      buttonRefs.current[key] = buttonRefs.current[value];  
    }
  }, [])

  return (
    <div className="main">
      <input className="display" value={toString(expression)} readOnly disabled/>
      <section className="calculator-body">
          {buttons.map((val, index) => <Button value={val} onClick={onClick} key={index}
                                          ref={(ele: HTMLButtonElement) => { buttonRefs.current[val] = ele }} />)}
      </section>
    </div>
  );
}

export default App;
