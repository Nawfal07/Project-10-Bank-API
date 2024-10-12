import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile, getUserDetails } from "../redux/slice";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.authentication.token);
  const currentUser = useSelector((state) => state.authentication.user);
  const [isEditOn, setIsEditOn] = useState(false);
  const [editFirstName, setEditFirstName] = useState(currentUser?.firstName);
  const [editLastName, setEditLastName] = useState(currentUser?.lastName);

  // PRIVATE ROUTE, SHOULD NOT ACCESS WITHOUT TOKEN
  if (!token) {
    navigate("/");
  }

  const handleCancel = () => {
    setEditFirstName(currentUser?.firstName);
    setEditFirstName(currentUser?.lastName);
    setIsEditOn(false);
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  return (
    <main className="main bg-dark">
      <div className="header">
        {!isEditOn ? (
          <>
            <h1>
              Welcome back
              <br />
              {currentUser && (
                <>{`${currentUser.firstName} ${currentUser.lastName}`}!</>
              )}
            </h1>
            <button
              className="edit-button"
              onClick={() => {
                setIsEditOn(true);
              }}
            >
              Edit Name
            </button>
          </>
        ) : (
          <form>
            <div className="edit-form">
              <input
                type="text"
                id="firstname"
                value={editFirstName}
                onChange={(e) => setEditFirstName(e.target.value)}
              />
              <input
                type="input"
                id="lastname"
                value={editLastName}
                onChange={(e) => setEditLastName(e.target.value)}
              />
            </div>
            <button
              type="button"
              // className="sign-in-button"
              onClick={() => {
                dispatch(
                  editUserProfile({
                    firstName: editFirstName,
                    lastName: editLastName,
                  })
                );
                setIsEditOn(false);
              }}
            >
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}
