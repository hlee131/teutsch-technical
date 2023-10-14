import "./App.css";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import calculate from "./calculate";

export const OPERATORS = ["+", "-", "*", "/", "^"];
export const ACTIONS = ["C", "="];

function App() {

  // store the current expression as a stack of button presses 
  // for easy inserting and deletion
  const [expression, setExpression] = useState<string[]>([]);

  // if we're showing the result of a calculation, pressing a number 
  // shouldn't add the number onto the end of the answer
  const [showingAns, setShowingAns] = useState(false); 

  const buttons = ["1", "2", "3", "/",
                   "4", "5", "6", "*",
                   "7", "8", "9", "-",
                   "0", "(", ")", "+", 
                   "C", ".", "=", "^"];

  const buttonRefs = useRef<{[button: string]: HTMLButtonElement}>({}); 
  
  // on-click handler for each calculator button
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

  // converts the array of button presses into a single string
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
  
  // add event listener for each key press
  useEffect(() => { 
    const onKeyDown = (event: KeyboardEvent) => {
      if (Object.keys(buttonRefs.current).includes(event.key)) {
        event.preventDefault(); event.stopPropagation();
        const ele = buttonRefs.current[event.key]; 
        ele.click(); 

        // animate the button press 
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
      <div className="display"><p>{toString(expression)}</p></div>
      <section className="calculator-body">
          {buttons.map((val, index) => <Button value={val} onClick={onClick} key={index}
                                          ref={(ele: HTMLButtonElement) => { buttonRefs.current[val] = ele }} />)}
      </section>
    </div>
  );
}

export default App;
