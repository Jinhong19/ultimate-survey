import React, { Component } from "react";
import YesNo from "./YesNo";

export class SurveyState extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.items.map(item => (
            <YesNo qNumber={this.props.items.indexOf(item) + 1} question={item} removeItem={this.props.removeItem} />
        ));
    }
}

export default SurveyState;
