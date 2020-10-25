import React from "react";
// import logo from './logo.svg';
// import './App.css';
import Button, { ButtonType, ButtonSize } from "./components/Button/Button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          test
        </Button>
        <Button autoFocus>test</Button>
        <Button btnType={ButtonType.Link} href="www.baidu.com">
          test
        </Button>

        <h1>标题1</h1>
        <h2>标题2</h2>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
