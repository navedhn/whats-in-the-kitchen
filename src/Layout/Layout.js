import React from "react";
import { ReactSVG } from "react-svg";
import logo from "../images/logo.svg";
import "../App.css";

const Layout = () => {
  return (
    <div div className="bdy">
      <header>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="logo">
                {/* <img src={require("../images/logo.svg")} /> */}
                <ReactSVG src={logo} />
              </div>
              <div className="header-content">
                <h4>Welcome to</h4>
                <h1>What's in the Kitchen?</h1>
                <p>Your culinary assistant that crafts recipes from the ingredients you already have. Start by typing in the ingredients in your pantry, add your preferred spices, and choose your cooking method. Hit 'Generate Recipe', and voilà, get a custom recipe idea instantly. It's that simple! Get ready to explore new and exciting dishes with just a few clicks.</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Layout;
