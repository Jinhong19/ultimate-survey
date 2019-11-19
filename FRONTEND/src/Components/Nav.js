import React, { Component } from "react";
import { AppBar, Toolbar, Button, withStyles, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({ 
    root: {
        flexGrow: 1
    },
    menuItem: {
        margin: '1em',
        color: 'white'
    },
    account: {
        marginLeft: 'auto'
    }
});

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: null};
    }

    handleClick = event => {
        this.setState({
            open: event.currentTarget
        });
    }

    handleClose = () => {
        this.setState({
            open: null
        });
    }

    render() {
        return (
            <div className="root" >
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography className={this.props.classes.menuItem} variant="h5">
                            Hello, {this.props.userName}
                        </Typography>
                        <Button
                            className={this.props.classes.menuItem}
                            edge="start"
                            href="/ManagerDashboard"
                        >
                            <Typography variant="h5">Home</Typography>
                        </Button>
                        <Button
                            className={this.props.classes.menuItem}
                            align="left"
                            href="#"
                        >
                            <Typography variant="h5">Surveys</Typography>
                        </Button>
                        <div className={this.props.classes.account}>
                            <IconButton
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                color="secondary"
                            >
                                <AccountCircle fontSize="large" />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.open}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(this.state.open)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Change password</MenuItem>
                                <MenuItem onClick={() => window.location.href="/"} >Log Out</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Nav.defaultProps = {
    userName: 'USER'
  };

export default withStyles(styles)(Nav);
