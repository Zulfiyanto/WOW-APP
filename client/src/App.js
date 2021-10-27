// Import Components
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Subscribe from "./pages/Subscribe";

import { useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import DetailBook from "./pages/DetailBook";
import ReadBook from "./pages/ReadBook";
import Transaction from "./pages/Transactions";
import AddBook from "./pages/AddBook";

import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  useEffect(() => {
    // Redirect Auth
    if (!state.isLogin) {
      history.push("/");
    } else {
      if (state.user.role === "admin") {
        history.push("/Transaction");
      } else if (state.user.role === "user") {
        history.push("/Home");
      }
    }
  }, [state]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await API.get("/check-auth");

        // If the token incorrect
        if (response.status === 401) {
          return dispatch({
            type: "AUTH_ERROR",
          });
        }

        // Get user data
        let payload = response.data.data.user;
        console.log(response);

        // Get token from local storage
        payload.token = localStorage.token;

        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload,
        });
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/Home" exact>
          <Home />
        </Route>
        <Route path="/Subscribe">
          <Subscribe />
        </Route>
        <Route path="/Profile">
          <Profile />
        </Route>
        <Route path="/Detail/:id">
          <DetailBook />
        </Route>
        <Route path="/Read/:id">
          <ReadBook />
        </Route>
        <Route path="/Transaction">
          <Transaction />
        </Route>
        <Route path="/Add">
          <AddBook />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
