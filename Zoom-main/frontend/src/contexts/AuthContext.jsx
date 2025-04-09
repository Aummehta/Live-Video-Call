import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";


export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${server}/api/v1/users`,
    headers: {
        'Content-Type': 'application/json'
    }
})


export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);


    const [userData, setUserData] = useState(authContext);


    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            if (!name || !username || !password) {
                throw new Error("All fields are required");
            }
            
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })


            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            console.error("Registration error:", err);
            throw err;
        }
    }

    const handleLogin = async (username, password) => {
        try {
            if (!username || !password) {
                throw new Error("Username and password are required");
            }
            
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            console.log(username, password)
            console.log(request.data)

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                router("/home")
                return true;
            }
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    }

    const getHistoryOfUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Authentication required");
            }
            
            let request = await client.get("/get_all_activity", {
                params: {
                    token: token
                }
            });
            return request.data
        } catch (err) {
            console.error("Error fetching history:", err);
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Authentication required");
            }
            
            let request = await client.post("/add_to_activity", {
                token: token,
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            console.error("Error adding to history:", e);
            throw e;
        }
    }


    const data = {
        userData, setUserData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}
