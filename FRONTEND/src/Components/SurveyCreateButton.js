import React from "react";
import { Button } from "react-bootstrap";

class SurveyCreateButton extends React.Component {
    render() {
        const handleCreate = () => {
            console.log("item List- from Create Button");
            console.log(JSON.stringify(this.props.items));
            // TODO - implement display message upon insert into database
            fetch(
                "http://ultimate-survey.herokuapp.com//survey/manager",
                {
                    method: "post",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.props.items),
                    credentials: 'include'
                }
            )
            .then(response => response.json())
            .then(data => console.log(data));
        };

        return (
            <div className="text-center" style={marginBtn}>
                <Button
                    onClick={handleCreate}
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
