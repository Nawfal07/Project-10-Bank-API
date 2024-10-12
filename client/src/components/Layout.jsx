import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../redux/slice";

export default function Layout() {
  const token = useSelector((state) => state.authentication.token);
  const currentUserFirstName = useSelector(
    (state) => state.authentication.user.firstName
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" href="#" to="/">
          <img
            className="main-nav-logo-image"
            src="img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        {!token ? (
          <div>
            <Link className="main-nav-item" href="" to="login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          </div>
        ) : (
          <>
            <div class="main-nav-item">
              <i class="fa fa-user-circle"></i>
              {currentUserFirstName}
            </div>
            <div class="main-nav-item" onClick={handleLogout}>
              <i class="fa fa-sign-out"></i>
              Sign Out
            </div>
          </>
        )}
      </nav>
      <Outlet />
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}
