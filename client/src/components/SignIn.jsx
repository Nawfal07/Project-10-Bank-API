import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setPassword, setUsername } from "../redux/slice";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const username = useSelector((state) => state.authentication.username);
  const password = useSelector((state) => state.authentication.password);
  const token = useSelector((state) => state.authentication.token);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("token", token);
    if (token) {
      navigate("/user");
    }
  }, [navigate, token]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                dispatch(setUsername(e.target.value));
              }}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            type="button"
            className="sign-in-button"
            onClick={() => {
              dispatch(login());
            }}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
