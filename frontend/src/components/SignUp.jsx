import { Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { newRegsiter } from "../api/Api";
import { LuEye } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa";


function SignUp() {
    const [isVisible, setIsVisible] = useState(false);
    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        role: "admin",
        password: "",
    });

    function handleChange(e) {
        const { value, name } = e.target;
        setInputs({ ...inputs, [name]: value })
    };

    async function handleSubmit() {

        if (!inputs.first_name || !inputs.last_name || !inputs.email || !inputs.mobile || !inputs.password) {
            alert("Please enter all the field")
        } else {
            let body = { ...inputs };

            let result = await newRegsiter(body);

            if (result?.data?.status === 200) {
                alert(result?.data?.message);
                setInputs({
                    first_name: "",
                    last_name: "",
                    email: "",
                    mobile: "",
                    role: "admin",
                    password: "",
                });
            } else {
                alert(result?.data?.message)
            }
        }


    }
    return (<>
        <TextField
            name="first_name"
            type="text"
            value={inputs.first_name}
            onChange={(e) => handleChange(e)}
            placeholder="First Name"
            className="textfield"
            style={{ marginBottom: "25px" }}
            fullWidth
        />
        <TextField
            name="last_name"
            type="text"
            value={inputs.last_name}
            onChange={(e) => handleChange(e)}
            placeholder="Last Name"
            className="textfield"
            style={{ marginBottom: "25px" }}
            fullWidth
        />
        <TextField
            name="mobile"
            type="number"
            value={inputs.mobile}
            onChange={(e) => handleChange(e)}
            placeholder="Mobile"
            className="textfield"
            style={{ marginBottom: "25px" }}
            fullWidth
        />
        <TextField
            name="email"
            type="email"
            value={inputs.email}
            onChange={(e) => handleChange(e)}
            placeholder="Email"
            className="textfield"
            style={{ marginBottom: "25px" }}
            fullWidth
        />
        <TextField
            select
            name="role"
            value={inputs.role}
            onChange={(e) => handleChange(e)}
            placeholder="Password"
            className="textfield"
            style={{ marginBottom: "25px" }}
            fullWidth
        >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="guest">Guest</MenuItem>
        </TextField>
        <TextField
            name="password"
            type={isVisible ? "text" : "password"}
            value={inputs.password}
            onChange={(e) => handleChange(e)}
            placeholder="Password"
            autoComplete="off"
            className="textfield"
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
            Sign Up
        </Button>
    </>)
};

export default SignUp;