import { combineReducers } from "redux";
import productStore from "./productStore"

const rootReducer = combineReducers({
    productStore: productStore
});

export default rootReducer;
