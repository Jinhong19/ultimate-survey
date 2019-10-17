import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from
'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage';
import EmployeePage from './Pages/EmployeePage';
import ManagerPage from './Pages/ManagerPage';
import ManagerDashboard from './Pages/ManagerDashboard';
import EmployeeDashboard from './Pages/EmployeeDashboard';

class App extends Component {
  render() {
    return (
      <Router>
        {/*This line is make a page for landingpage */}
        <Route exact path="/" component = {LandingPage} />
        {/*This line is make a page for employeepage */}
        <Route path="/employeepage" component = {EmployeePage} />
        {/*Brings to manager dashboard -- not completed*/}
        <Route path="/managerdashboard" component = {ManagerDashboard} />
        {/*Brings to employee dashboard -- not completed*/}
        <Route path="/employeedashboard" component = {EmployeeDashboard} />
        {/*This line brings you to the survey creation page*/}
        <Route path="/managerpage" component = {ManagerPage} />

      </Router>
    )

  }
}

export default App;
