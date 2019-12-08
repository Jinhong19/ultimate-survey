import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AccountButton from '../Components/AccountButton';
import SurveyMenu from "../Components/SurveyMenu";
import Survey from "../Components/Survey";
import ManagerBoard from "../Components/ManagerBoard";
import EmployeeBoard from "../Components/EmployeeBoard";



import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
    },
    snack: {
        backgroundColor: "#509e2f" // background color not working
    },
    message: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: "1em"
    }
}));

export default function DashboardTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [state, setState] = React.useState({
        open: false,
    });
    const [user, setUser] = React.useState({
        firstName: "please log in",
        isManager: false,
        _id: "",
        lastName: "",
    });

    useEffect(() => {
        if (props.location.state != undefined) {
            let receivedSubmission = props.location.state.submit;
            console.log("received submission status: " + receivedSubmission);
            updateSubmit(receivedSubmission);
        }
        // fetch user info from endpoint
        fetch("https://ultimate-survey.herokuapp.com/user/info", 
            {method:'GET',
             headers: {'Content-Type': 'application/json'},
             credentials: 'include'})
            .then(response => response.json())
            .then(data => {
                updateUser(data);
            });
        
    }, []);


    const updateUser = (data) => {
        setUser({
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            isManager: data.isManager,
        });
    }

    const updateSubmit = (updatedState) => {
        setState({
            open: updatedState
        });

        console.log("received state! new OPEN state: " + state.open);
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
                anchorOrigin={{
                    vertical: "top", horizontal: "center"
                }}
                open={state.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <SnackbarContent
                    className={classes.snack}
                    TransitionComponent={Slide}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id" className={classes.message}>
                        <Typography variant="h5">
                            <CheckCircleIcon className={classes.icon} />
                            Survey submitted!
                        </Typography>
                    </span>}
                    action={[
                        <IconButton key="close" aria-label="close" color="secondary" onClick={handleClose}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>,
                    ]}
                />
            </Snackbar>
            <AppBar position="static">
                <div className="userGreeting">
                    <Typography
                        className={classes.menuItem}
                        variant="h5"
                    >
                        Hello, {user.firstName}
                    </Typography>
                </div>
                <div className="tabContainer">
                    {user.isManager ?
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
                        :
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab
                                className={classes.tabLabel}
                                label="take"
                                {...a11yProps(0)}
                            />
                        </Tabs>
                    }
                </div>
                <AccountButton />
            </AppBar>
            <TabPanel value={value} index={0}>
                <SurveyMenu />
                <EmployeeBoard />
                <a href="/takesurvey">Click here to take a survey</a>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <SurveyMenu />
                <ManagerBoard />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Survey />
            </TabPanel>

        </div>
    );
}
