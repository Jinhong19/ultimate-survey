import React from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

class SurveyCreateButton extends React.Component {
    render() {
        const handleCreate = () => {
            console.log("item List- from Create Button");
            console.log(
                JSON.stringify({
                    title: this.props.title,
                    deadline: this.props.deadline,
                    survey: this.props.items
                })
            );
            // TODO - implement display message upon insert into database
            fetch("http://ultimate-survey.herokuapp.com/survey/manager", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: this.props.title,
                    deadline: this.props.deadline,
                    survey: this.props.items
                }),
                credentials: "include"
            })
                .then(response => response.json())
                .then(data => console.log(data));

            window.location.reload();
        };

        return (
            <div className="text-center" style={marginBtn}>
                <Link to={{pathname: '/dashboard', state: {submit: true}}}>
                    <Button
                        onClick={handleCreate}
                        size="lg"
                        variant="success"
                        // href="/"
                    >
                        Create
                    </Button>
                </Link>
            </div>
        );
    }
}

const marginBtn = {
    marginTop: "1em"
};

export default SurveyCreateButton;
