import React from "react";
import { Button } from "react-bootstrap";

class SurveyCreateButton extends React.Component {
    render() {
        const handleCreate = () => {
            console.log("item List- from Create Button");
            console.log(JSON.stringify(this.props.items));
            fetch(
                "https://ultimate-survey.herokuapp.com/survey/manager/5d9f7051269df83d214204b4",
                {
                    method: "post",
                    mode: "no-cors",
                    body: JSON.stringify(this.props.items)
                }
            ); //
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
