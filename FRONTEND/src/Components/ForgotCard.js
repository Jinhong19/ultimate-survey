import React, { Component } from 'react';
import { withStyles, Button, Card, CardHeader, CardContent, CardActions, 
            TextField, Typography } from '@material-ui/core';
import ForgotPre from './ForgotPre.js';
import ForgotPost from './ForgotPost';

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
    back: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

class ForgotCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: <ForgotPre invalid={false} sub={this.onSubmit.bind(this)} onUpdate={this.updateEmail.bind(this)} />, 
            email: ''
        };
    }

    updateEmail = newEmail => {
        this.setState({
            email: newEmail.target.value
        });
    }

    onSubmit = () => {
        if(this.state.email.length < 1){
            this.setState({
                done: <ForgotPre invalid={true} sub={this.onSubmit.bind(this)} onUpdate={this.updateEmail.bind(this)} />
            })
        } 
        else {
            this.setState({
                done: <ForgotPost />
            });
        }
    };

    render() {
        return(
            <div className={this.props.classes.container} >
                <Card className={this.props.classes.card} >
                    <CardHeader title="Password Reset" />
                    {this.state.done}
                    <CardActions>
                        <Button className={this.props.classes.back} href="/">Back to login page</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(ForgotCard);