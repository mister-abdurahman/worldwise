import React from "react";
import NavBar from "../../components/NavBar";
import styles from "./Pricing.module.css";
import pricingImg from "../../assets/img-2.jpg";

export default function Pricing() {
  return (
    <div className={styles.pricing}>
      <NavBar />
      {/* <section> */}
      <main>
        <div>
          <h1>
            Simple Pricing. <br /> Just #2300 per month.
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            enim excepturi iusto deleniti ipsa, aliquam officiis asperiores esse
            fugit assumenda magnam, voluptatibus facilis consequuntur debitis
            eveniet quos consectetur itaque non.
          </p>
        </div>
        <figure>
          <img src={pricingImg} alt="pricing" />
        </figure>
      </main>
      {/* </section> */}
    </div>
  );
}
