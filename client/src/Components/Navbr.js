import React from "react";
import './Navbr.css'

const Navbr = () => {
  return (
    <>
      <header>
      <ul>
  <li>
    <a className="active" href="/">
      Home
    </a>
  </li>
  <li>
    <a href="/CarsList">Cars List</a>
  </li>
  <li>
    <a href="/carOwner">Became a car Owner</a>
  </li>
  <li>
    <a href="/contact">Contact</a>
  </li>
  <li>
    <a href="/about">About</a>
  </li>
  <li>
    <a className="supin" href="/SignUpIn">Sign UP/IN</a>
  </li>
</ul>
      </header>
    </>
  );
};

export default Navbr;
