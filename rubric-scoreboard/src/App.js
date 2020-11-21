import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Radarmap1 from "./components/Radarmap1";
import Radarmap2 from "./components/Radarmap2";


function App() {

    var type = 1;

    function setType(type) {
        alert(`hello, ${type}`);
        return type;
      }
    let show = () => {
        if (type === 1) {
            return (
                <div>
            <Radarmap1 />
                </div>
            )
        } else if (type === 2) {
            return (
                <div><Radarmap2 /></div>
            )

        }
    }

    return (
        <div>
            <center>
                <h1>2021 STEM+ Challenges</h1>
                <h2>Scoreboard</h2>
            </center>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select location</h3>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <Button onClick={() => setType(1)}variant="light">Hong Kong Center 1</Button>{' '}
            <Button onClick={() => setType(2)}variant="outline-secondary">Zhenjiang Center 1</Button>{' '}
            {show()}
        </div>
    )

}
export default App;
