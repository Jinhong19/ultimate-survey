import React, { Component } from 'react';
import { withStyles, Button, Card, CardHeader, CardContent, CardActions, 
            TextField, Typography } from '@material-ui/core';

const styles = theme => ({
    container: {
        margin: '1rem',
        height: '100%',
        width: '100%'
    },
    card: {
        display: 'block',
        margin: 'auto',
        width: '40em',
        textAlign: 'center'
    },
    text: {
        margin: '1em',
        marginBottom: '0em',
        marginBottom: '0'
    },
    entry: {
        marginTop: '0.7em'
    },
    submit: {
        color: 'white'
    },
    back: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

class ForgotCard extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className={this.props.classes.container} >
                <Card className={this.props.classes.card} >
                    <CardHeader title="Password Reset" />
                    <CardContent>
                        <Typography className={this.props.classes.text} variant="p" >
                            Enter your email below to reset your password
                        </Typography>
                        <TextField 
                            required
                            className={this.props.classes.entry}
                            label="Email"
                            fullWidth="true"
                        />
                    </CardContent>
                    <CardActions>
                        <Button
                            className={this.props.classes.submit}
                            variant="contained"
                            color="primary"
                            fullWidth="true"
                            href="#"
                        >
                            Submit
                        </Button>
                    </CardActions>
                    <CardActions>
                        <Button className={this.props.classes.back} href="/">Back to login page</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(ForgotCard);