//import { useEffect } from 'react'
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Home from "./components/Home";


import ProtectedRoute from './components/route/ProtectedRoutes';


function App() {
  return (
    <Router>
      <div className="app">
      <Route path="/" component={Home} exact/>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute path="/me" component={Profile} exact />
      <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
      <ProtectedRoute
        path="/password/update"
        component={UpdatePassword}
        exact
      />
      <Route path="/password/forgot" component={ForgotPassword} exact />
      <Route path="/password/reset/:token" component={NewPassword} exact />
      </div>
    </Router>
  );
}

export default App;
