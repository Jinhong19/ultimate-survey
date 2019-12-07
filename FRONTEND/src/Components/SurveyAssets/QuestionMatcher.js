import React, { Component } from "react";
import Boolean from "./Boolean";
import ShortAnswer from "./ShortAnswer";
import LongAnswer from "./LongAnswer";
import MultipleChoice from "./MultipleChoice";
import Checkbox from "./Checkbox";

export class QuestionMatcher extends Component {
    render() {
        // console.log(this.props);
        const { question, type, id, options } = this.props.question;

        if (type === "Yes or No") {
            return (
                <Boolean
                    question={question}
                    id={id}
                    qNumber={this.props.qNumber}
                    removeItem={this.props.removeItem}
                    edit={this.props.edit}
                />
            );
        } else if (type === "Short Answer") {
            return (
                <ShortAnswer
                    question={question}
                    id={id}
                    qNumber={this.props.qNumber}
                    removeItem={this.props.removeItem}
                    edit={this.props.edit}
                />
            );
        } else if (type === "Long Answer") {
            return (
                <LongAnswer
                    question={question}
                    id={id}
                    qNumber={this.props.qNumber}
                    removeItem={this.props.removeItem}
                    edit={this.props.edit}
                />
            );
        } else if (type === "Multiple Choice") {
            return (
                <MultipleChoice
                    question={question}
                    id={id}
                    qNumber={this.props.qNumber}
                    options={options}
                    removeItem={this.props.removeItem}
                    edit={this.props.edit}
                />
            );
        } else if (type === "Checkbox") {
            return (
                <Checkbox
                    question={question}
                    id={id}
                    qNumber={this.props.qNumber}
                    options={options}
                    removeItem={this.props.removeItem}
                    edit={this.props.edit}
                />
            );
        } else {
            return (
                <div>
                    <h1>Error</h1>
                </div>
            );
        }
    }
}

export default QuestionMatcher;
