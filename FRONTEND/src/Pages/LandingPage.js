import React from "react";
import { withStyles, Typography, AppBar } from "@material-ui/core";
import LoginCard from "../Components/LoginCard";
import Background from "../Media/back.jpeg";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

const styles = theme => ({
    logo: {
        display: "block",
        width: "20em",
        height: "9em",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "3em"
    },
    background: {
        backgroundImage: "url(" + Background + ")",
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }
});

class LandingPage extends React.Component {
    render() {
        return (
            <div className={this.props.classes.background}>
                <AppBar color="primary" position="static">
                    <Typography
                        align="center"
                        variant="h3"
                        color="secondary"
                        style={{ padding: "0.6em" }}
                    >
                        Ultimate Survey
                    </Typography>
                </AppBar>
                <img
                    className={this.props.classes.logo}
                    src={require("../Media/logo.png")}
                    alt="company logo"
                />
                <LoginCard />
                <Typography align="center" variant="h4">
                    For development: <a href="/Dashboard">Dashboard</a>
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(LandingPage);
