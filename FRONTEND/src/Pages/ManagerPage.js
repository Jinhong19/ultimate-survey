import React from "react";
import Nav from "../Components/Nav";
import "../App.css";
import Survey from "../Components/Survey";
import { Container } from "react-bootstrap";

function App() {
    return (
        <div className="App">
            <Nav words="Manager" />
            <Container>
                <Survey />
            </Container>
        </div>
    );
}

export default App;
