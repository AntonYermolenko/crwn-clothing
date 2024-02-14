import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { cateogiresReducer } from "./categories/category.redcuer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: cateogiresReducer,
    cart: cartReducer,
});