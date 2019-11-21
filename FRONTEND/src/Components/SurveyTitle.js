import React, { Component, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import EditableLabel from "react-inline-editing";

const styles = theme => ({
    card: {
        display: "block",
        width: "55em",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "3em"
    }
});

class SurveyTitle extends React.Component {
    constructor(props) {
        super(props);

        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
    }

    _handleFocus(text) {
        console.log("Focused with text: " + text);
    }

    _handleFocusOut(text) {
        console.log("Left editor with text: " + text);
    }

    render() {
        return (
            <div>
                <Card className={this.props.classes.card}>
                    <CardContent>
                        <EditableLabel
                            text="Untitled Survey"
                            labelClassName="myLabelClass"
                            inputClassName="myInputClass"
                            inputWidth="100%"
                            inputHeight="30pt"
                            inputMaxLength="50"
                            labelFontWeight="bold"
                            inputFontWeight="bold"
                            labelFontSize="26pt"
                            inputFontSize="26pt"
                            onFocus={this._handleFocus}
                            onFocusOut={this._handleFocusOut}
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }
}

const margin = {
    marginTop: "1em",
    marginRight: "1em"
};

export default withStyles(styles)(SurveyTitle);
