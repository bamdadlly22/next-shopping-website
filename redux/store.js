const { createStore } = require("redux");
const { default: rootReducer } = require("./rootReducer");


const store = createStore(rootReducer);

export default store;