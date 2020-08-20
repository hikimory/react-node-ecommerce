import { combineReducers } from "redux";
import { productListReducer, productDetailsReducer,
    productSaveReducer, productDeleteReducer} from "./productReducers";
import { cartReducer } from "./cartReducers";
import { userSigninReducer, userRegisterReducer } from "./userReducers";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from "./orderReducers";

export const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
})