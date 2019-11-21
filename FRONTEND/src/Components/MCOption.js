import React, { Component } from "react";

export class MCOption extends Component {
    render() {
        console.log("MCO l10: " + this.props.options);

        this.props.options.map(function(label) {
            console.log(label);
            return <p>{label}</p>;
        });

        // return this.props.options.map(label => {
        // <Form.Group controlId="surveyQuestion">
        //     <div key="inline-radio" className="mb-3">
        //         <Form.Check
        //             inline
        //             name="option"
        //             label={" " + label}
        //             type="radio"
        //             id="inline-radio-1"
        //         />
        //     </div>
        // </Form.Group>;
        // <p>{label}</p>;
        // });

        return <div></div>;
    }
}

export default MCOption;
