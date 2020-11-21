import * as React from "react";
import ScoreBoard from "./components/ScoreBoard";
import "./App.css";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <ScoreBoard />
      </div>
    );
  }
}

export default App;
