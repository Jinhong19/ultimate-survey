import React, { Component } from "react";
import { Link } from "react-router-dom";
import QuestionCard from "../Components/QuestionCard";
import Nav from "../Components/Nav";
import "../App.css";
import Survey from "../Components/Survey";
import { Container, Button, Modal, Row, Col, Form } from "react-bootstrap";

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
