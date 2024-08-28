import { Box, Button, Tab, Tabs, TextField } from "@mui/material";
import classes from "./styles.module.css";
import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function Register() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (<Box className={classes.register} >
        <Box width={{ xs: "95%", sm: "60%", md: "30%" }} boxShadow={"0 0 5px rgba(0,0,0,0.5)"} bgcolor={"#fff"}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Login" {...a11yProps(0)} />
                        <Tab label="Sign Up" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Login />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <SignUp />
                </CustomTabPanel>
            </Box>
        </Box>
    </Box>)
};


export default Register;