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
    }

    getChartType = () => {
        const {question, responses, options, type} = this.props.questionWithResponses;
        if(type.localeCompare("Checkbox")==0){
           let checkbox = [];
           for(let i = 0; i<options.length; i++){
               checkbox[i]={
                   "label":options[i],
                   "value": 0
               }
           }
           const checkboxInstance = checkbox;
           for (let i = 0; i < responses.length; i ++){
               for(let j = 0; j<checkboxInstance.length; j++){
                if (responses[i] == checkboxInstance[j]){
                    checkboxInstance[j].value++;
                }
               }
            }
           return <BarChart data = {checkboxInstance} colors = {["#88cc88", "#55aa55", "#116611", "#004400", "#2d882d"]} title = {question}></BarChart>
        }
        else if(type.localeCompare("Yes or No")==0){
            const YesOrNoInstance = 
           [{
               "label": "Yes",
               "value": 0
           },
           {
               "label": "No",
               "value": 0
           }];
           for (let i = 0; i < responses.length; i ++){
               if (responses[i] == "Yes"){
                   YesOrNoInstance[0].value++;
               }
               else {
                   YesOrNoInstance[1].value++;
               }
           }
           return <DoughnutChart data = {YesOrNoInstance} title = {question}colors = {["#88cc88", "#55aa55", "#116611", "#004400", "#2d882d"]}></DoughnutChart>
        }
        else if(type.localeCompare("Multiple Choice")==0){
            let multChoice = [];
            for(let i = 0; i<options.length; i++){
                multChoice[i]={
                    "label": options[i],
                    "value": 0
                }
            }
            const multChoiceInstance=multChoice;
            for (let i = 0; i < responses.length; i ++){
                for(let j = 0; j<multChoiceInstance.length; j++){
                 if (responses[i] == multChoiceInstance[j]){
                     multChoiceInstance[j].value++;
                 }
                } 
            }
            return <DoughnutChart data = {multChoiceInstance} title = {question} colors = {["#88cc88", "#55aa55", "#116611", "#004400", "#2d882d"]}></DoughnutChart>
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
                        {this.props.questionWithResponses.question}
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