import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import logo from "../Media/logo.png";
import Nav from "../Components/Nav";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Link } from "react-router-dom";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import * as widgets from "surveyjs-widgets";

import "icheck/skins/square/blue.css";
window["$"] = window["jQuery"] = $;
require("icheck");

Survey.StylesManager.applyTheme("default");

widgets.icheck(Survey, $);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);

class App extends Component {
    state = {
        surveyid: "nothing",
        survey: {},
        questions: []
    };

    onValueChanged(result) {
        console.log("value changed!");
    }

    onComplete(result) {
        console.log("Complete! " + result);
    }

    onLoad = () => {
        console.log("Hello");
        console.log(this.state);
    };

    componentDidMount() {
        // if (this.props.location !== undefined) {
        //     if (this.props.location.state.surveyid !== undefined) {
        //         this.setState({
        //             surveyid: this.props.location.state.surveyid
        //         });
        //     }
        // }
        console.log(this.props.location.surveyid);
        fetch("https://ultimate-survey.herokuapp.com/survey/employee", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                // console.log(JSON.parse(data));
                let surveys = JSON.parse(data);

                for (let i = 0; i < surveys.length; i++) {
                    if (surveys[i]._id.$oid === this.props.location.surveyid) {
                        this.setState({
                            survey: surveys[i],
                            questions: surveys[i].survey.survey
                        });
                        break;
                    }
                }

                // this.setState({ surveys: JSON.parse(data) });
                console.log(this.state.questions);
            });
    }

    // componentDidMount() {
    //     fetch("https://ultimate-survey.herokuapp.com/survey/employee", {
    //         method: "GET",
    //         headers: { "Content-Type": "application/json" },
    //         credentials: "include"
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             this.setState({ surveys: JSON.parse(data) });
    //         });
    // }

    render() {
        var model = new Survey.Model(this.props.surveyid);
        return (
            <div className="App" onLoad={this.onLoad}>
                <Nav words="Survey Taker" />
                <div className="App-header">
                    <Link to="/employeedashboard">
                        <img src={logo} class="logo-medium" alt="logo" />
                    </Link>
                    <h2>We are the Ultimate 3!</h2>
                </div>
                <div className="surveyjs">
                    {/*If you want to show survey, uncomment the line below*/}
                    <h1>SurveyJS library in action:</h1>
                    <Survey.Survey
                        model={model}
                        onComplete={this.onComplete}
                        onValueChanged={this.onValueChanged}
                    />
                    {/*If you do not want to show Survey Creator, comment the line below*/}
                    {/*<h1>SurveyJS Creator in action:</h1>
          <SurveyCreator /> */}
                </div>
                <p className="App-intro">
                    {/* To get started, edit <code>src/App.js</code> and save to reload. */}
                </p>
            </div>
        );
    }
}

export default App;
