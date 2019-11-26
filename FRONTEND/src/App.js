import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import EmployeePage from "./Pages/EmployeePage";
import ManagerPage from "./Pages/ManagerPage";
import Dashboard from "./Pages/Dashboard";
import Forgot from "./Pages/Forgot";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import green from "@material-ui/core/colors/green";

// Creates the website theme
const theme = createMuiTheme({
    palette: {
        primary: green, // should be #509e2f
        secondary: {
            main: "#FFFFFF"
        }
    }
});

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    {/*This line is make a page for landingpage */}
                    <Route exact path="/" component={LandingPage} />
                    {/*This line is make a page for employeepage */}
                    <Route path="/EmployeePage" component={EmployeePage} />
                    <Route path="/Dashboard" component={Dashboard} />
                    {/*This line brings you to the survey creation page*/}
                    <Route path="/ManagerPage" component={ManagerPage} />
                    {/*Forgot password page*/}
                    <Route path="/forgot" component={Forgot} />
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;
