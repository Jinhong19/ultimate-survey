import React, { Component } from 'react';
import { withStyles, Card, CardContent, CardActions, Button, TextField,
            Typography, Divider, Grid } from '@material-ui/core';

const styles = theme => ({
  text: {
    margin: '1em',
    marginTop: '2em',
    marginBottom: '0em',
  },
  card: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    minHeight: '21em',
    width: '40em',
    textAlign: 'center'
  },
  entry: {
    marginTop: "0.7em",
  },
  password: {
      marginLeft: 'auto',
      marginRight: 'auto'
  }
});

class LoginCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className={this.props.classes.card}>
                <CardContent>
                    <Typography align="center" component="h4" variant="h4">
                        {this.props.user}
                    </Typography>
                    <Divider />
                    <Typography
                        className={this.props.classes.text}
                        align="center"
                        component="p"
                        variant="p"
                    >
                        Please login to be directed to your survey center.
                    </Typography>
                    <TextField
                        className={this.props.classes.entry}
                        label="Username"
                        variant="outlined"
                        fullWidth="true"
                    />
                    <TextField
                        className={this.props.classes.entry}
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth="true"
                    />
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth="true"
                        href={this.props.redir}
                    >
                        <Typography color="secondary">Login</Typography>
                    </Button>
                </CardActions>
                <CardActions>
                <Button 
                    className={this.props.classes.password}
                    size="small"
                    href="/forgot"
                >
                    Forgot password
                </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(LoginCard);
