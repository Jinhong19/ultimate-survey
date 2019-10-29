import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
  card: {
    width: 500,
    maxHeight: 300,
  },
});

class LoginCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid item>
        <Card className={this.props.style} height={500} width={300}>
          <CardContent>
            <Typography align="center" component='h4' variant='h4'>{this.props.user}</Typography>
            <Divider />
            <Typography align="center" component="p" variant="body1" class="text">Click Login to be directed to the {this.props.user} login page.</Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" fullWidth="true" href={this.props.redir}><Typography color="secondary">Login</Typography></Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default LoginCard
