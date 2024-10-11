import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setPassword, setUsername } from "../redux/slice";

export default function SignIn() {
  const username = useSelector((state) => state.authentication.username);
  const password = useSelector((state) => state.authentication.password);
  const dispatch = useDispatch();

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
