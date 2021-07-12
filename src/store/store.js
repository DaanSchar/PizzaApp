import { combineReducers, createStore } from "redux";
import cartReducer from "./cart/cartReducer";
import favReducer from "./favorites/favReducer";
import catReducer from "./category/catReducer";
import searchReducer from "./search/searchReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favReducer,
  selectedCategory: catReducer,
  homeSearchText: searchReducer,
})

const store = createStore(rootReducer)
export default store
