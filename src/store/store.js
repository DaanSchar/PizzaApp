import { combineReducers, createStore } from "redux";
import cartReducer from "./cart/cartReducer";
import favReducer from "./favorites/favReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favReducer,
})

const store = createStore(rootReducer)
export default store
