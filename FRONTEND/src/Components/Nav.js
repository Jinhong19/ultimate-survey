import React, { Component } from "react";
import { AppBar, Toolbar, Button, withStyles, Typography } from '@material-ui/core';

const styles = theme => ({ 
    root: {
        flexGrow: 1
    },
    buttons: {
        margin: '1em',
        color: 'white'
    }
});

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="root" >
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Button
                            className={this.props.classes.buttons}
                            edge="start"
                            href="/ManagerDashboard"
                        >
                            <Typography variant="h6">Home</Typography>
                        </Button>
                        <Button
                            className={this.props.classes.buttons}
                            align="left"
                            href="#"
                        >
                            <Typography variant="h6">Surveys</Typography>
                        </Button>
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

export default withStyles(styles)(Nav);
