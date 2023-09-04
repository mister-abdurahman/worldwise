import React, { useEffect, useState } from "react";
import styles from "./LogIn.module.css";
import NavBar from "../../components/NavBar";
import { ContextTypes, useAuth } from "../../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export interface AuthContextDataType {
  logIn: () => {};
  // logOut: Function;
}

export default function LogIn() {
  const [email, setEmail] = useState("abdu@gmail.com"); //so we dont have to fill everytime
  const [password, setPassword] = useState("12345");

  const navigate = useNavigate();
  const { logIn, isAuthenticated, error }: ContextTypes = useAuth();
  // const { logIn, isAuthenticated }: any = useAuth();

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true }); //replace:true replaces the previous route with the new route
    },
    [isAuthenticated, navigate]
  );

  function handleLogInBtn(e: React.FormEvent) {
    e.preventDefault();
    if (email && password) logIn && logIn(email, password);
  }

  return (
    <div className={styles.login}>
      <NavBar />
      <form action="" className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error ? <h4 className="error-text">{error}</h4> : ""}

        <Button type={"primary"} onClick={handleLogInBtn}>
          Login
        </Button>
      </form>
    </div>
  );
}
