import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import coinMarketCap from "./coinmarketcap-reducer";
import signup from "./signup-reducer";
import authentication from "./authentication-reducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    coinMarketCap,
    signup,
    authentication
  });