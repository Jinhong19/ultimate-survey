import React, { Component } from "react";
import {
    CardContent,
    Typography,
    CardActions,
    Button,
    TextField,
    withStyles
} from "@material-ui/core";

class ChangePost extends Component {
    render() {
        return (
            <div>
                <CardContent>
                    <p>
                    Your password has been changed successfully! 
                    </p>
                </CardContent>
                <CardActions>
                <Button
                    style={{display: 'flex'}, { margin: "auto" }}
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => (window.location.href = "/")}
                >
                    Please login again.
                </Button>
                </CardActions>

            </div>
        );
    }
}

export default ChangePost;
