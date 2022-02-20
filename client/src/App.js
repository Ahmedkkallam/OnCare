import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import Navbar from "./components/Navbar";
import userReducer from "./store/reducers/user";
import Dashboard from "./components/Dashboard";

const initialState = {};
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
const middleware = [thunk];

const store = createStore(
  userReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline>
        <Navbar />
        <Container>
          <Dashboard />
        </Container>
      </CssBaseline>
    </Provider>
  );
};

export default App;
