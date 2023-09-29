import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="main">
      <section className="calculator-body">
        <input type="text" value={"TODO: make this work ;)"} id="calculator-input" />
        <img src={logo} className="react-logo" alt="Remove Me!" />
        <div>
          <button className="calculator-button">7</button>
          <button className="calculator-button">8</button>
          <button className="calculator-button">9</button>
        </div>
        <div>
          <button className="calculator-button">4</button>
          <button className="calculator-button">5</button>
          <button className="calculator-button">6</button>
        </div>
        <div>
          <button className="calculator-button">1</button>
          <button className="calculator-button">2</button>
          <button className="calculator-button">3</button>
        </div>
      </section>
    </div>
  );
}

export default App;
