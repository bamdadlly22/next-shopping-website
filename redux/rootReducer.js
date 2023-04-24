const { combineReducers } = require("redux");
const { default: cartReducer } = require("./cart/reducer");



const rootReducer = combineReducers({
    shoppingCart: cartReducer
})

export default rootReducer;