import React from "react";
//import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import logo from "./images/logo.svg";

const Genrating = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/search");
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [navigate]);
  return (
    <div className="G-bdy">
      <header>
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="logo text-center">
                <ReactSVG src={logo} />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="loading">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="desire-meal">
                <h1 class="text-center">Generating Your Desired Meal!</h1>
                <div class="progress-container ">
                  <div class="progress-bar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Genrating;
