import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BarChart from '../Components/BarChart';
import DoughnutChart from '../Components/DoughnutChart';

const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
const classes=useStyles;
class AnalyticsCard extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.responses);
        this.state = {
            questionTitle: this.props.questionWithResponses.question,
            questionResponses: this.props.responses,
            type: this.props.questionWithResponses.type,
            options: this.props.questionWithResponses.options
        }
    }

    getChartType = () => {
        console.log(this.state.questionResponses);
        if(this.state.type.localeCompare("Checkbox")==0){
           let checkbox = [];
           for(let i = 0; i<this.state.options.length; i++){
               checkbox[i]={
                   "label":this.state.options[i],
                   "value": 0
               }
           }
           const checkboxInstance = checkbox;
           for (let i = 0; i < this.state.questionResponses.length; i ++){
               for(let j = 0; j<checkboxInstance.length; j++){
                if (this.state.questionResponses[i] == checkboxInstance[j]){
                    checkboxInstance[j].value++;
                }
               }
            }
           return <BarChart data = {checkboxInstance}></BarChart>
        }
        else if(this.state.type.localeCompare("Yes or No")==0){
            const YesOrNoInstance = 
           [{
               "label": "Yes",
               "value": 0
           },
           {
               "label": "No",
               "value": 0
           }];
           for (let i = 0; i < this.state.questionResponses.length; i ++){
               if (this.state.questionResponses[i] == "Yes"){
                   YesOrNoInstance[0].value++;
               }
               else {
                   YesOrNoInstance[1].value++;
               }
           }
           return <DoughnutChart data = {YesOrNoInstance} colors = {"#009933"}></DoughnutChart>
        }
        else if(this.state.type.localeCompare("Multiple Choice")==0){
            let multChoice = [];
            for(let i = 0; i<this.state.options.length; i++){
                multChoice[i]={
                    "label": this.state.options[i],
                    "value": 0
                }
            }
            const multChoiceInstance=multChoice;
            for (let i = 0; i < this.state.questionResponses.length; i ++){
                for(let j = 0; j<multChoiceInstance.length; j++){
                 if (this.state.questionResponses[i] == multChoiceInstance[j]){
                     multChoiceInstance[j].value++;
                 }
                } 
            }
            return <DoughnutChart data = {multChoiceInstance} title = {this.state.questionTitle}colors = {"#009933"}></DoughnutChart>
        }
        else {
            console.log("short answer");
            return null;
        }
        
    }

    render(){


        return (            
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {this.state.questionTitle}
                    </Typography>
                    <div>
                        {this.getChartType()}
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default AnalyticsCard