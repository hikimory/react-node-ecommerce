import { combineReducers } from "redux";
import { productListReducer, productDetailsReducer,
    productSaveReducer, productDeleteReducer} from "./productReducers";
import { cartReducer } from "./cartReducers";
import { userSigninReducer, userRegisterReducer } from "./userReducers";

export const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer
})