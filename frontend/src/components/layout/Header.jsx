import React, { Fragment } from "react";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { useAlert } from "react-alert";
import Search from "./Search";

import "../../App.css";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  if (user) console.log("hello");

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
  };

  return (
    <Fragment>
      <nav class="navbar row justify-content-center sticky-top">
        <div class="container">
          <div class="col-3 p-0">
            <div class="navbar-brand" id="logo">
              <Link to="/dashboard">Travel and co</Link>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>
        {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle "
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    className="rounded-circle"
                    alt={user && user.name}
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {user && user.role !== "admin" ? (
                  <Link className="dropdown-item" to="/orders/me">
                    Orders
                  </Link>
                ) : (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
                <div class="col-3 mt-3 mt-md-0 text-center">
            <Link to="/login" class="btn btn-danger px-4 text-white login-header-btn float-right">
              Login
            </Link>
          </div>
              
            )
          )}
        </div>
      </nav>
      </Fragment>
  )}

export default Header;
