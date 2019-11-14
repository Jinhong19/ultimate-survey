import React, { Component } from "react";
import { Button } from "react-bootstrap";

class SurveyCreateButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const handleCreate = () => {
            console.log("item List- from Create Button");
            console.log(this.props.items);
        }

        return (
            <div className="text-center" style={marginBtn}>
                <Button onClick = {handleCreate}
                    size="lg"
                    variant="success"
                    // href="/"
                >
                    Create
                </Button>
            </div>
        );
    }
}

const marginBtn = {
    marginTop: "1em"
};

export default SurveyCreateButton;
