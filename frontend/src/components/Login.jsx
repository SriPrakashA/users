import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { loginUser } from "../api/Api";
import { useNavigate } from "react-router-dom";
import classes from "./styles.module.css";
import { LuEye } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa";


function Login() {
    const [isVisible, setIsVisible] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    function handleChange(e) {
        const { value, name } = e.target;
        setInputs({ ...inputs, [name]: value })
    }

    async function handleSubmit() {



        if (!inputs.email || !inputs.password) {
            alert("Please enter all the field")
        } else {
            let body = { ...inputs };

            let result = await loginUser(body);
            console.log("result =", result);

            if (result?.data?.status === 200) {
                alert(result?.data?.message);
                setInputs({
                    email: "",
                    password: ""
                });
            } else {
                alert(result?.data?.message)
            }
        }
    }
    return (<>
        <TextField
            type="text"
            name="email"
            value={inputs.email}
            onChange={(e) => handleChange(e)}
            placeholder="Email"
            className="textfield"
            style={{ marginBottom: "25px" }}
            fullWidth
        />
        <TextField
            name="password"
            type={isVisible ? "text" : "password"}
            value={inputs.password}
            onChange={(e) => handleChange(e)}
            placeholder="Password"
            className="textfield"
            autoComplete="off"
            style={{ marginBottom: "25px" }}
            fullWidth
            slotProps={{
                input: {
                    endAdornment: <InputAdornment position="start" style={{ cursor: "pointer" }} onClick={() => setIsVisible(!isVisible)} >
                        {isVisible ? <LuEye /> : <FaRegEyeSlash />}
                    </InputAdornment>,
                },
            }}
        />
        <Button variant="contained" fullWidth onClick={handleSubmit} >
            Login
        </Button>
        <Typography onClick={() => navigate("/users")} className={classes.user_page} >Click to see existing users</Typography>
    </>)
};

export default Login;