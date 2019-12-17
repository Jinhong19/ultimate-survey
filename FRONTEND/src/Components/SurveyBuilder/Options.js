import React, { Component } from "react";
import { Form } from "react-bootstrap";

export class Options extends Component {
    render() {
        // console.log(this.props);
        let count = 1;
        return this.props.options.map(o => (
            <li style={{ marginBottom: "10px" }}>
                <Form.Control
                    type="text"
                    placeholder={o}
                    className={count++}
                    onChange={this.props.onChange}
                    // value={this.state.title}
                />
            </li>
        ));
    }
}

export default Options;
