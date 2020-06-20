import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import { persistStore } from "redux-persist";

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
//persist 없으면 export default 로 바로 export 해준다
export const persistor = persistStore(store);
