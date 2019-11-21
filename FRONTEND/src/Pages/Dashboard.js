import React from "react";
import Nav from "../Components/Nav";
import SurveyMenu from "../Components/SurveyMenu";
import Survey from "../Components/Survey";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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
    }
}));

export default function DashboardTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Nav />
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
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
            </AppBar>
            <TabPanel value={value} index={0}>
                <SurveyMenu />
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
