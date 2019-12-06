import React from "react";
import Nav from "../Components/Nav";
import "../App.css";
import SurveyBuilder from "../Components/SurveyBuilder/SurveyBuilder";
import { Container } from "react-bootstrap";

function App() {
    return (
        <div className="App">
            <Nav words="Manager" />
            <Container>
                <SurveyBuilder />
            </Container>
        </div>
    );
}

export default App;
