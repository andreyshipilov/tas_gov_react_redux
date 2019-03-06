import axios from "axios";
import {FETCH_USERS} from "./types";

export const fetchUsers = token => async dispatch => {
    const res = await axios.get("https://reqres.in/api/users");
    dispatch({type: FETCH_USERS, payload: res.data.data});
};
