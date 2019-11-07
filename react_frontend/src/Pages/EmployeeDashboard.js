 import React from 'react';
import '../App.css';
import Nav from '../Components/Nav'
import SurveyMenu from '../Components/SurveyMenu'

function App() {
  return (
    <div className="App">
      <Nav words="Employee" />
      <h1>Hello, employees!</h1>
      <h3>Surveys</h3>
      <SurveyMenu></SurveyMenu>
    </div>
  );
}

export default App;
