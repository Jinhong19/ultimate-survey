import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Components/Nav';
import QuestionCard from '../Components/QuestionCard';
import SurveyMenu from '../Components/SurveyMenu';

function App() {
  return (
    <div className="App">
      <Nav words="Manager" />
      <h1>Hello, managers!</h1>
      <div>
        <SurveyMenu />
      </div>
      <br />
      <p>Click <a href='/ManagerPage'>here</a> to take a survey</p>
    </div>
  );
}

export default App;
