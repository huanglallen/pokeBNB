import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown";

  return (
    <>
        <button>
            <div style={{ fontSize: "100px" }}>
                <i className="fa-solid fa-user"></i>
            </div>
        </button>
        <ul className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
                <button onClick={logout}>Log Out</button>
            </li>
        </ul>
    </>
  );
}

export default ProfileButton;
