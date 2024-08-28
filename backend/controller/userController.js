const bcrypt = require("bcryptjs");
const user = require("../model/userModel")
let sendResponse = {
    status: 200,
    data: [],
    message: ""
}

const registerUser = async (req, res) => {
    try {
        let body = { ...req.body };
        let my_user = await user.findOne({ email: body?.email });

        if (my_user) {
            sendResponse["status"] = 400;
            sendResponse["data"] = [];
            sendResponse["message"] = "Email already registered with us";

            res.json(sendResponse);
        } else {
            let new_pass = await bcrypt.hash(req.body.password, 10);
            body.password = new_pass;
            console.log(body);

            let new_data = new user(body);

            new_data.save().then(() => {
                sendResponse["status"] = 200;
                sendResponse["data"] = [];
                sendResponse["message"] = "Registered Successfully";

                res.json(sendResponse);
            })
                .catch((error) => {
                    sendResponse["status"] = 400;
                    sendResponse["data"] = [];
                    sendResponse["message"] = error;

                    res.json(sendResponse);
                })
        }

    } catch (error) {
        sendResponse["status"] = 400;
        sendResponse["data"] = [];
        sendResponse["message"] = error;

        res.json(sendResponse);
    }
};

const loginUser = async (req, res) => {
    try {
        let body = { ...req.body };

        let my_user = await user.findOne({ email: body?.email });
        if (my_user) {
            const isMatch = await bcrypt.compare(body?.password, my_user?.password);
            if (isMatch) {
                sendResponse["status"] = 200;
                sendResponse["data"] = [];
                sendResponse["message"] = "Login Successful";

                res.json(sendResponse);
            } else {
                sendResponse["status"] = 400;
                sendResponse["data"] = [];
                sendResponse["message"] = "Invalid Password";

                res.json(sendResponse);
            }
        } else {
            sendResponse["status"] = 400;
            sendResponse["data"] = [];
            sendResponse["message"] = "User not found";

            res.json(sendResponse);
        }

    } catch (error) {
        sendResponse["status"] = 400;
        sendResponse["data"] = [];
        sendResponse["message"] = error;

        res.json(sendResponse);
    }
};


const getUsers = async (req, res) => {
    try {
        let body = { ...req.body };

        let _search = {};

        if (body?.role && body?.role !== "all") {
            _search["role"] = body?.role;
        }
        console.log(body?.search);

        if (body?.search && body?.search !== "") {
            _search["$or"] = [
                { first_name: { $regex: body?.search, $options: 'i' } },
                { last_name: { $regex: body?.search, $options: 'i' } },
                { mobile: { $regex: parseInt(body?.search), $options: 'i' } },
                { email: { $regex: body?.search, $options: 'i' } },
                { role: { $regex: body?.search, $options: 'i' } },
            ]
        };
        console.log(_search);

        let my_user = await user.find(_search);
        console.log("my_user =", my_user);

        if (my_user) {
            sendResponse["status"] = 200;
            sendResponse["data"] = my_user;
            sendResponse["message"] = "All Users List";

            res.json(sendResponse);

        } else {
            sendResponse["status"] = 400;
            sendResponse["data"] = [];
            sendResponse["message"] = "No users";

            res.json(sendResponse);
        }

    } catch (error) {
        sendResponse["status"] = 400;
        sendResponse["data"] = [];
        sendResponse["message"] = error;

        res.json(sendResponse);
    }
};
module.exports = { registerUser, loginUser, getUsers };