import React from 'react';
import { withStyles, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
    account: {
        marginLeft: "auto"
    }
});

class AccountButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: null };
    }

    handleClick = event => {
        this.setState({
            open: event.currentTarget
        });
    }

    render() {
        return(
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
                        vertical: "top",
                        horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={Boolean(this.state.open)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={() => window.location.href="/changepassword"}>
                        Change Password
                    </MenuItem>
                    <MenuItem onClick={() => window.location.href = "/"}>
                        Log Out
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(AccountButton);