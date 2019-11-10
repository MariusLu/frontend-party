import * as types from "./actionTypes";
import * as serverApi from "../../api/serverApi";


export function loadServersSuccess(servers) {
    return { type: types.LOAD_SERVERS_SUCCESS, servers }
}

export function loadServers() {
    return function (dispatch) {
        return serverApi
            .getServers()
            .then(servers => {
                dispatch(loadServersSuccess(servers))
            })
            .catch(error => {
                throw error;
            })
    }
}