import React from "react";
import styles from "./User.module.css";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { user, logOut }: any = useAuth();
  const navigate = useNavigate();

  function handleLogOut(e: React.FormEvent) {
    e.preventDefault();
    logOut();
    navigate("/");
  }

  return (
    <div className={styles["logout-card"]}>
      <figure>
        <img src={user?.avatar} alt="user avatar" />
      </figure>
      <h4>Welcome, {user?.name}</h4>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
}
