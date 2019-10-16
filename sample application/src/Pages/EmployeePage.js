import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import SurveyCreator from "../SurveyCreator";
import logo from "./logo.png";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

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
  json = {
    title: "Employee Satisfaction Survey Example",
    showProgressBar: "top",
    pages: [
      {
        elements: [
          {
            "type": "radiogroup",
            "name": "job happiness",
            "title": "Are you happy with your job?",
            "isRequired": false,
            "colCount": 0,
            "choices": ["1|Very much yes!!", "2|yes", "3|neutral", "4|no"]
          },
          {
            type: "bootstrapslider",
            name: "bootstrapslider", 
            title: "What percentage of productivity do you believe you are achieving currently?"
          },
          {
            type: "sortablelist",
            name: "positives",
            title: "What elements of your job are fulfilling/satisfying?",
            isRequired: false,
            colCount: 0,
            choices: ["the work itself", "the company culture", "the compensation"]
          }
        ]
      },
      {
        questions: [
          {
            type: "matrix",
            name: "Quality",
            title:
              "Please indicate if you agree or disagree with the following statements",
            columns: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ],
            rows: [
              {
                value: "affordable",
                text: "My manger and I communicate frequently"
              },
              {
                value: "does what it claims",
                text: "When my manager and I communicate, we communicate well"
              },
              {
                value: "better then others",
                text: "My manager is accessible"
              },
              {
                value: "easy to use",
                text: "My manager is too involved (ie micromanages) my work"
              }
            ]
          },
          {
            type: "rating",
            name: "satisfaction",
            title: "How satisfied are you with the company culture?",
            mininumRateDescription: "Not Satisfied",
            maximumRateDescription: "Completely satisfied"
          },
           {
            type: "barrating",
            name: "barrating1",
            ratingTheme: "css-stars",
            title: "How effective was this survey?", 
            description: "1 star being not effective, 5 stars being very effective",
            choices: ["1", "2", "3", "4", "5"]
          }
        ]
      }
    ]
  };

  onValueChanged(result) {
    console.log("value changed!");
  }

  onComplete(result) {
    console.log("Complete! " + result);
  }

  render() {
    var model = new Survey.Model(this.json);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
