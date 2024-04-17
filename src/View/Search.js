import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";
import logo from "../images/logo.svg";
import angle from "../images/angle.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "./PDF";

const Search = ({ clearQueryParams, show, plainText, formattedText, queryParams, queryParamsStateBack, setShow }) => {
  const location = useLocation();
  const iconStyle = {
    borderRadius: "100%",
    padding: "5px 9px",
    marginRight: "10px",
  };
  const downloadStyle = {
    ...iconStyle,
    color: "#000000",
    border: "1px solid #000000",
  };

  const shareUrl = queryParamsStateBack ? queryParamsStateBack : queryParams;
  const title = "Check this out!";
  const history = useNavigate();

  const updateUrl = () => {
    history("/");
  };

  return (
    <>
      {show === false ? (
        <div className="bdy recipe">
          <header>
            <div class="container">
              <div class="row">
                <div class="col-sm-12">
                  <div class="logo">
                    <ReactSVG src={logo} />
                  </div>

                  <div class="header-content">
                    <Link
                      to={"/"}
                      type={"button"}
                      onClick={() => {
                        setShow(true);
                        clearQueryParams();
                        updateUrl();
                      }}
                      class="btn-b d-flex"
                    >
                      <ReactSVG src={angle} /> &nbsp;
                      <text>Back</text>
                    </Link>
                    <div className="d-flex justify-content-between">
                      <h1>Here’s Your Recipe:</h1>
                      <div className="d-flex">
                        {/* <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" style={{ ...iconStyle, color: "#1DA1F2", border: "1px solid #1DA1F2" }}>
                      <FontAwesomeIcon icon={faTwitter} size="1x" />
                    </a> */}
                        <div className="me-2">
                          <TwitterShareButton
                            url={shareUrl} // Make sure this is a valid URL
                            quote={title}
                            className="Demo__some-network__share-button"
                          >
                            <TwitterIcon size={35} round />
                          </TwitterShareButton>
                        </div>
                        <div className="me-2">
                          <FacebookShareButton url={window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + location.pathname + "?" + shareUrl} quote={title} className="Demo__some-network__share-button">
                            <FacebookIcon size={35} round />
                          </FacebookShareButton>
                        </div>

                        {/* <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer" style={{ ...iconStyle, color: "#C13584", border: "1px solid #C13584" }}>
                      <FontAwesomeIcon icon={faInstagram} size="1x" />
                    </a> */}
                        <PDFDownloadLink document={<PDF formattedText={formattedText} plainText={plainText} />} fileName="Recipe.pdf">
                          {({ blob, url, loading, error }) =>
                            loading ? (
                              ""
                            ) : (
                              <div style={downloadStyle} className="align-self-start">
                                <FontAwesomeIcon icon={faDownload} size="1x" />
                              </div>
                            )
                          }
                        </PDFDownloadLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div class="recipe-content">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">{/* col-lg-8 */}
                  <div class="content-holder">
                    <div style={{ fontSize: "14px" }} dangerouslySetInnerHTML={{ __html: formattedText }}></div>
                  </div>
                  {/* <Link to="#" class="livechat button">
                    {" "}
                    Start Live Chat
                  </Link> */}
                </div>
                {/* <div class="col-lg-4">
                  <aside class="sidebar">
                    <div class="widget nutritionfacts">
                      <h4>Nutrition facts</h4>
                      <ul>
                        <li>Calories: 251</li>
                        <li>Total Fat: 12g</li>
                        <li>Saturated Fat: 2g</li>
                        <li>Cholesterol: 96mg</li>
                        <li>Sodium: 219mg</li>
                        <li>Total Carbohydrates: 1g</li>
                        <li>Dietary Fiber: 0g</li>
                      </ul>
                    </div>
                    <div class="widget relevantrecipes">
                      <h4>Relevant Recipes</h4>
                      <ul>
                        <li>
                          {" "}
                          <a href="/recipe">Herb-Crusted Baked</a>
                        </li>
                        <li>
                          {" "}
                          <a href="/recipe"> Garlic Herb Grilled</a>
                        </li>
                        <li>
                          {" "}
                          <a href="/recipe"> Honey Garlic Herb</a>
                        </li>
                        <li>
                          {" "}
                          <a href="/recipe"> Creamy Herb Chicken</a>
                        </li>
                        <li>
                          {" "}
                          <a href="/recipe"> Creamy Herb Chicken</a>
                        </li>
                        <li>
                          {" "}
                          <a href="/recipe"> Herb-Crusted Chicken</a>
                        </li>
                        <li>
                          {" "}
                          <a href="/recipe"> Garlic Herb Grilled</a>
                        </li>
                        <li>
                          {" "}
                          <a href="/recipe"> Garlic Herb Grilled</a>
                        </li>
                        <li>
                          {" "}
                          <a href="/recipe">Garlic Herb Grilled</a>
                        </li>
                      </ul>
                    </div>
                  </aside>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Search;
