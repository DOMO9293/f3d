import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import scrapReducer from "./scrap/scrap.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  scrap: scrapReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["scrap"],
};

export default persistReducer(persistConfig, rootReducer);
