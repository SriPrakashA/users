import { Box, Button, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import classes from "./styles.module.css";
import { useEffect, useState } from "react";
import { getUsers } from "../api/Api";
import { useNavigate } from "react-router-dom";


function Users() {

    const [allUsers, setAllUsers] = useState([]);
    const [role, setRole] = useState("all");
    const [searchVal, setSearchVal] = useState("");
    const navigate = useNavigate();

    async function handleGetUsers() {
        let body = { role, search: searchVal };

        let result = await getUsers(body);

        if (result?.data?.status === 200) {
            setAllUsers(result?.data?.data);
        } else {
            setAllUsers([]);
        }
        console.log(result);

    }

    useEffect(() => {
        handleGetUsers();
    }, [role, searchVal])
    return (<Box>
        <Box width={{ xs: "95%", sm: "85%", md: "75%" }} margin={"auto"} my={4}>
            <Box className={classes.user_searchpart}>
                <Typography className={classes.user_title}>User List</Typography>
                <Button variant="contained" onClick={() => navigate("/register")} >
                    Add User
                </Button>
            </Box>
            <Box className={classes.user_searchpart}>
                <TextField
                    className="textfield"
                    placeholder="Search.."
                    onChange={(e) => setSearchVal(e.target.value)}
                />
                <TextField
                    select
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Password"
                    className="textfield"
                    style={{ width: "150px" }}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="guest">Guest</MenuItem>
                </TextField>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell >First Name</TableCell>
                            <TableCell >Last Name</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell >Mobile</TableCell>
                            <TableCell >Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(allUsers) &&
                            allUsers.map((row, index) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell >{row.first_name}</TableCell>
                                    <TableCell >{row.last_name}</TableCell>
                                    <TableCell >{row.email}</TableCell>
                                    <TableCell >{row.mobile}</TableCell>
                                    <TableCell >{row.role}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {Array.isArray(allUsers) &&
                allUsers?.length === 0 &&
                <Typography textAlign={"center"} mt={4}>No data found</Typography>
            }
        </Box>
    </Box>)
};


export default Users;