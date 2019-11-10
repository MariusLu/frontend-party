import * as types from "../actions/actionTypes";
import initialState from "./intitialState";

export default function serverReducer(state = initialState.server, action) {
    switch (action.type) {
        case types.LOAD_SERVERS_SUCCESS:
            return action.servers;
        default:
            return state;
    }
}