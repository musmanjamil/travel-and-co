import { useEffect } from 'react'
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
import Dashboard from "./components/tours/Dashboard";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SearchByBudget from "./components/layout/SearchByBudget";
import SearchedByBudget from "./components/tours/SearchedByBudget";
import tourDetails from "./components/tours/TourDetails"

//import admin routes from 
import NewTour from './components/admin/NewTour'
import ProtectedRoute from "./components/route/ProtectedRoutes";

import {loadUser} from "./actions/userActions"
import store from "./store"

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  },[])

  return (
    <Router>
      <div className="app">
        <Header />
        <Route path="/" component={Home} exact />
        <div className="container container-fluid">
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/search/:keyword" component={Dashboard} />
          <Route path="/searchbybudget" component={SearchByBudget} />
          <Route path="/tours/search/:budget" component={SearchedByBudget} />
          <Route path="/register" component={Register} />
          <Route path="/tour/:id" component={tourDetails} />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePassword}
            exact
          />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <ProtectedRoute path="/admin/tour" isAdmin={true} component={NewTour} exact />

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
