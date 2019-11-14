import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ height: 50 }}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h3" color="secondary">
                            {this.props.words}
                        </Typography>
                        <Button
                            style={{ marginLeft: "auto" }}
                            variant="contained"
                            align="right"
                            href="/"
                        >
                            Log Out
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Nav;
