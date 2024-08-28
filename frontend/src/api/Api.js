import axios from "axios"

export const newRegsiter = async(body)=>{
    return axios.post(`${process.env.REACT_APP_BASE_URL}/register`,body)
    .then((res)=>{
        return res;
    })
    .catch((err)=>{
        return err
    })
}

export const loginUser = async(body)=>{
    return axios.post(`${process.env.REACT_APP_BASE_URL}/login`,body)
    .then((res)=>{
        return res;
    })
    .catch((err)=>{
        return err
    })
}

export const getUsers = async(body)=>{
    return axios.post(`${process.env.REACT_APP_BASE_URL}/users`,body)
    .then((res)=>{
        return res;
    })
    .catch((err)=>{
        return err
    })
}