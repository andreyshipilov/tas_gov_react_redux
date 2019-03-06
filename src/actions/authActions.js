import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {GET_ERRORS, SET_CURRENT_USER, USER_LOADING} from "./types";

// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("https://reqres.in/api/login", userData)
        .then(res => {
            const {token} = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            dispatch(setCurrentUser(token));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};
