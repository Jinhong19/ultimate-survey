import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import EditableLabel from "react-inline-editing";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const styles = theme => ({
    card: {
        display: "block",
        maxWidth: "55em",
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

    handleChange = date => {
        this.props.updateDate(date);
        // console.log(this.props.deadline);
    };

    _handleFocus(text) {
        // console.log("Focused with text: " + text);
    }

    _handleFocusOut(text) {
        // console.log("Left editor with text: " + text);
        this.props.updateTitle(text);
    }

    render() {
        return (
            <div>
                <Card className={this.props.classes.card}>
                    <CardContent>
                        <EditableLabel
                            text={this.props.title}
                            labelClassName="myLabelClass"
                            inputClassName="myInputClass"
                            inputWidth="100%"
                            isEditing="true"
                            emptyEdit="true"
                            labelFontWeight="500"
                            inputFontWeight="500"
                            labelFontSize="26pt"
                            inputFontSize="26pt"
                            onFocus={this._handleFocus}
                            onFocusOut={this._handleFocusOut}
                        />
                        <br />
                        <h3>Survey Deadline</h3>
                        <DatePicker
                            selected={this.props.deadline}
                            onChange={this.handleChange}
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(SurveyTitle);
