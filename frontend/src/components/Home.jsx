import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
	<div className="ab-divs">
      <div id="content-container">
        <div id="page_sprk_default_preset_name_custom___1_ek1">
          <div id="_bg__sprk_default_preset_name_custom___1_ek2"></div>
          <img
            src="images/khadija_yousaf_t1mvz7c3eya_unsplash.png"
            id="khadija_yousaf_t1mvz7c3eya_unsplash"
          />
          <div id="rectangle_4"></div>
          <div id="travelling___co">travelling &amp; co</div>

          <div id="group_1">
            <div id="_10">10</div>
            <div id="__01">/01</div>
          </div>

          <div id="group_2">
            <div id="rectangle_2"></div>
            <Link to="/dashboard">
              <div id="sign_up">View</div>
            </Link>
          </div>

          <div id="group_4">
            <i className="fab fa-youtube" id="_001_youtube"></i>

            <div id="_002_instagram">
              <i className="fab fa-instagram"></i>
            </div>

            <div id="_007_messenger">
              <div id="group_3">
                <i className="fab fa-facebook-messenger"></i>
              </div>
            </div>
          </div>

          <div id="tourism">Tourism</div>
        </div>
      </div>
	  </div>
    </>
  );
};

export default Home;
