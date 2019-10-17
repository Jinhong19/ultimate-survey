import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello, managers!</h1>
      <h4>Click <Link to="/managerpage">here</Link> to create a survey.</h4>
      <p><Link to="/">Back to home</Link></p>
    </div>
  );
}

export default App;
