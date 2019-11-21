import React, { Component } from "react";
import {
    Container,
    Modal,
    Row,
    Col,
    Form,
    FormLabel,
    FormControl,
    Button
} from "react-bootstrap";
import { Card } from "@material-ui/core";

export class YesNo extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
			//1 value per option for multiple choice and checkbox questions  
			value1: "enter an option here", 
			value2: "enter an option here", 
			value3: "enter an option here", 
			value4: "enter an option here" 
			}   

    //one handleChange per option for multiple choice and checkbox questions
	handleChange1(event) { 
		this.setState({value1: event.target.value}); 
	}   
	handleChange2(event) { 
		this.setState({value2: event.target.value}); 
	}   
	handleChange3(event) { 
		this.setState({value3: event.target.value}); 
	}  
	handleChange4(event) { 
		this.setState({value4: event.target.value}); 
	}  

    render() {
        const { question, type, id } = this.props.question;

        console.log(this.props.question);

        if (type === "Yes or No") {
            return (
                <div className="addQuestion" style={margin}>
                    <Card style={cardStyle}>
                        <div className="wrapper" style={padding}>
                            <Form.Group controlId="surveyQuestion">
                                <FormLabel>
                                    {/* <h3>Question {this.props.qNumber}</h3> */}
                                    <h4>
                                        {this.props.qNumber}. {question}
                                    </h4>
                                </FormLabel>
                                <div key="inline-radio" className="mb-3">
                                    <Form.Check
                                        inline
                                        name="qCheck"
                                        label="  Yes"
                                        type="radio"
                                        id="inline-radio-1"
                                    />
                                    <Form.Check
                                        inline
                                        name="qCheck"
                                        label="  No"
                                        type="radio"
                                        id="inline-radio-2"
                                    />
                                </div>
                                <div style={removeBtn}>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={this.props.removeItem.bind(
                                            this,
                                            id
                                        )}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Form.Group>
                        </div>
                    </Card>
                </div>
            );
        } else if (type === "Short Answer") {
            return (
                <div className="addQuestion" style={margin}>
                    <Card style={cardStyle}>
                        <div className="wrapper" style={padding}>
                            <Form.Group controlId="surveyQuestion">
                                <FormLabel>
                                    <h4> {this.props.qNumber}. {question}</h4>
                                </FormLabel>
                                <div key="short-response" style={textBoxMargin}>
                                    <FormControl
                                        placeholder="Short Response"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div style={removeBtn}>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={this.props.removeItem.bind(
                                            this,
                                            id
                                        )}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Form.Group>
                        </div>
                    </Card>
                </div>
            );
        } else if (type === "Long Answer") {
            return (
                <div className="addQuestion" style={margin}>
                    <Card style={cardStyle}>
                        <div className="wrapper" style={padding}>
                            <Form.Group controlId="surveyQuestion">
                                <FormLabel>
                                    <h4> {this.props.qNumber}. {question}</h4>
                                </FormLabel>
                                <div key="short-response" style={textBoxMargin}>
                                    <FormControl
                                        as="textarea"
                                        aria-label="With textarea"
                                        placeholder="Long Response"
                                        rows="4"
                                    />
                                </div>
                                <div style={removeBtn}>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={this.props.removeItem.bind(
                                            this,
                                            id
                                        )}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Form.Group>
                        </div>
                    </Card>
                </div>
            );
        } else if (type === "Multiple Choice") { 
            return ( 
				<div className="addQuestion" style={margin}> 
					<Card style={cardStyle}>
						<div className="wrapper" style={padding}>
							<Form.Group controlId="surveyQuestion">
								<FormLabel>
									<h4>{this.props.qNumber}. {question}</h4>
								</FormLabel>    
								<div key="inline-radio" className="mb-3"> 
									<Form.Check
										inline
										name="qCheck"
										label= { <textarea value = {this.state.value1} onChange = {this.handleChange1.bind(this)}/>}
										type="radio"
										id="inline-radio-1"
									/>	 
									<Form.Check
										inline
										name="qCheck"
										label= { <textarea value = {this.state.value2} onChange = {this.handleChange2.bind(this)}/>}
										type="radio"
										id="inline-radio-2"
									/> 
									<Form.Check
										inline
										name="qCheck"
										label= { <textarea value = {this.state.value3} onChange = {this.handleChange3.bind(this)}/>}
										type="radio"
										id="inline-radio-3"
									/> 
									<Form.Check
										inline
										name="qCheck"
										label= { <textarea value = {this.state.value4} onChange = {this.handleChange4.bind(this)}/>}
										type="radio"
										id="inline-radio-4"
									/>
								</div> 
								<div style={removeBtn}>
									<Button
										variant="danger"
										size="sm"
										onClick={this.props.removeItem.bind(
											this,
											id
										)}
									>
										Delete
                                    </Button>
								</div>
							</Form.Group>  
						</div>
					</Card>
				</div> 
			);
        } else  if (type === "Checkbox"){
			return ( 
				<div className="addQuestion" style={margin}> 
					<Card style={cardStyle}>
						<div className="wrapper" style={padding}>
							<Form.Group controlId="surveyQuestion">
								<FormLabel>
									<h4>{this.props.qNumber}. {question}</h4>
								</FormLabel>    
								<div key="inline-radio" className="mb-3"> 
									<Form.Check
										inline
										name="qCheck"
										label= { <textarea value = {this.state.value1} onChange = {this.handleChange1.bind(this)}/>}
										type="checkbox"
										id="inline-checkbox-1"
									/>	 
									<Form.Check
										inline
										name="qCheck"
										label= { <textarea value = {this.state.value2} onChange = {this.handleChange2.bind(this)}/>}
										type="checkbox"
										id="inline-checkbox-2"
									/> 
									<Form.Check
										inline
										name="qCheck"
										label= { <textarea value = {this.state.value3} onChange = {this.handleChange3.bind(this)}/>}
										type="checkbox"
										id="inline-checkbox-3"
									/> 
									<Form.Check
										inline
										name="qCheck"
										label= { <textarea value = {this.state.value4} onChange = {this.handleChange4.bind(this)}/>}
										type="checkbox"
										id="inline-checkbox-4"
									/>
								</div> 
								<div style={removeBtn}>
									<Button
										variant="danger"
										size="sm"
										onClick={this.props.removeItem.bind(
											this,
											id
										)}
									>
										Delete
                                    </Button>
								</div>
							</Form.Group>  
						</div>
					</Card>
				</div> 
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

const margin = {
    marginBottom: "0.5em"
};

const textBoxMargin = {
    marginBottom: "1em"
};

const removeBtn = {
    marginBottom: "1em",
    textAlign: "right"
};

const padding = {
    paddingLeft: "2em",
    paddingRight: "2em"
};

const cardStyle = {
    display: "block",
    width: "55em",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3em",
    background: "f5f5f5"
};

export default YesNo;
