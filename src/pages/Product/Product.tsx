import React from "react";
import NavBar from "../../components/NavBar";
import styles from "./Product.module.css";
import productImg from "../../assets/img-1.jpg";

export default function Product() {
  return (
    <div className={styles.product}>
      {" "}
      <NavBar />
      <main>
        <figure>
          <img src={productImg} alt="product" />
        </figure>
        <div>
          <h1>Product</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            enim excepturi iusto deleniti ipsa, aliquam officiis asperiores esse
            fugit assumenda magnam, voluptatibus facilis consequuntur debitis
            eveniet quos consectetur itaque non.
          </p>
        </div>
      </main>
    </div>
  );
}
