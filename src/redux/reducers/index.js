import { combineReducers } from "redux";
import servers from "./serverReducer";


const rootReducer = combineReducers({
    servers
})

export default rootReducer;