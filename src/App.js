
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import CheckOut from "./components/CheckOut/CheckOut";
import Header from './components/Header/Header';
import Home from "./components/Home/Home";
import Order from "./components/Order/Order";
import { createContext,useState } from 'react';
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Admin from "./components/Admin/Admin";
import OrderDetails from "./components/OrderDetails/OrderDetails";

export const UserContext = createContext();
function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
          <Header></Header>

          <Switch> 

              <Route path="/home">
                 <Home />
              </Route>

              <PrivateRoute path="/checkOut/:name">
              <CheckOut />
            </PrivateRoute>

            
            
            <PrivateRoute path="/orders">
              <Order />
            </PrivateRoute>

            <Route exact path="/">
              <Home />
            </Route>

            <PrivateRoute path="/admin">
              <Admin/>
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>

          </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
