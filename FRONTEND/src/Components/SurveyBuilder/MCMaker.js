import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Options from "./Options";

export class MCMaker extends Component {
    state = {
        count: 0,
        options: []
    };

    options = [2, 3, 4, 5, 6];

    onChangeOption = e => {
        let index = Number(e.target.className.split(" ")[0]) - 1;
        this.props.onChangeOption(index, e.target.value);
    };

    onChangeNumber = e => {
        this.props.onChangeNumber(e);
    };

    render() {
        if (this.props.type === "Multiple Choice") {
            return (
                <div style={margin}>
                    <Form.Group controlId="responseType">
                        <Row>
                            <Col xs={6}>
                                <Form.Label>
                                    <h4>Select number of options</h4>
                                </Form.Label>
                            </Col>
                            <Col xs={2}>
                                <Form.Control
                                    as="select"
                                    onChange={this.onChangeNumber}
                                    value={this.props.count}
                                >
                                    <option>Select</option>
                                    {this.options.map(o => {
                                        return <option>{o}</option>;
                                    })}
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>

                    <h4>Enter the options</h4>
                    <ul>
                        <Options
                            options={this.props.options}
                            onChange={this.onChangeOption}
                        />
                    </ul>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

const margin = {
    marginTop: "2em"
};

export default MCMaker;
