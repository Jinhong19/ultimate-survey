import React, { Component } from "react";
import QuestionMatcher from "../SurveyAssets/QuestionMatcher";

export class SurveyState extends Component {
    render() {
        // console.log(this.props);
        return this.props.items.map(item => (
            <QuestionMatcher
                qNumber={this.props.items.indexOf(item) + 1}
                question={item}
                removeItem={this.props.removeItem}
                edit={this.props.edit}
            />
        ));
    }
}

export default SurveyState;
