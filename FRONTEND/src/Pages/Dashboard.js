import React from "react";
import { Link } from "react-router-dom";
import AccountButton from '../Components/AccountButton';
import SurveyMenu from "../Components/SurveyMenu";
import Survey from "../Components/Survey";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    tabLabel: {
        fontSize: "small"
    },
    userGreeting: {
        float: "left"
    },
    tabContainer: {
        float: "right"
    },
    menuItem: {
        display: "inline-block",
        margin: "1em",
        float: "left",
        color: "white"
    }
}));

export default function DashboardTabs() {
    const classes = useStyles();
    const [value, setValue, username] = React.useState(0);
    const [state, setState] = React.useState({
        open: false,
        username: "ERROR"
    });

    const componentDidMount = () => {
        let receivedSubmission = this.props.location.state.submit;
        updateSubmit(receivedSubmission);
    }

    const updateSubmit = (updatedState) => {
        setState({
            open: updatedState
        });
    }

    const handleClose = () => {
        setState({
            open: false
        });
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Snackbar
                open={state.open}
                onClose={handleClose}
                TransitionComponent={Slide}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Survey submitted!</span>}
            />
            <AppBar position="static">
                <div className="userGreeting">
                    <Typography
                        className={classes.menuItem}
                        variant="h5"
                    >
                        Hello, {username}
                    </Typography>
                </div>
                <div className="tabContainer">
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab
                            className={classes.tabLabel}
                            label="take"
                            {...a11yProps(0)}
                        />
                        <Tab
                            className={classes.tabLabel}
                            label="created"
                            {...a11yProps(1)}
                        />
                        <Tab
                            className={classes.tabLabel}
                            label="make"
                            {...a11yProps(2)}
                        />
                    </Tabs>
                </div>
                <AccountButton />
            </AppBar>
            <TabPanel value={value} index={0}>
                <SurveyMenu />
                <Link to={{pathname: '/takesurvey', state: {surveyID: "0001"}}}>Survey 1</Link>
                <br />
                <Link to={{pathname: '/takesurvey', state: {surveyID: "0002"}}}>Survey 2</Link>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Created surveys
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Survey />
            </TabPanel>
        </div>
    );
}
