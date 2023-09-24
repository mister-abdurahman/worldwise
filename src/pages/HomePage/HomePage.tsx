import { NavLink } from "react-router-dom";
import Button from "../../components/Button";
import NavBar from "../../components/NavBar";
import styles from "./HomePage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <NavBar />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <NavLink to={"/login"}>
          <Button type="primary">Track your Travels 🚀</Button>
        </NavLink>
      </section>
    </main>
  );
}
