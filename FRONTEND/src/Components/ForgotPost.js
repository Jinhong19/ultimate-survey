import React, { Component } from "react";
import { CardContent } from "@material-ui/core";

class ForgotPost extends Component {
    render() {
        return (
            <div>
                <CardContent>
                    <p>
                        An email has been sent. Use the link in the email to
                        reset your password.
                    </p>
                </CardContent>
            </div>
        );
    }
}

export default ForgotPost;
