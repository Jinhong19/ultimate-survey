import React, { Component } from "react";
import QuestionMatcher from "../SurveyAssets/QuestionMatcher";

export class QuestionList extends Component {
    render() {
        return this.props.items.map(item => (
            <QuestionMatcher
                qNumber={this.props.items.indexOf(item) + 1}
                question={item}
                removeItem={this.props.removeItem}
            />
        ));
    }
}

export default QuestionList;
