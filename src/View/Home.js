import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import { ReactSVG } from "react-svg";
import ingridients from "../images/ingridients.svg";
import spice from "../images/spice.svg";
import cook from "../images/cook.svg";
import { useNavigate, useLocation } from "react-router-dom";
import Genrating from "../Generating";
import Search from "./Search";

const Home = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [userInput, setUserInput] = useState("");
  const [selectedModel, setSelectedModel] = useState();
  const [selectedSpices, setSelectedSpices] = useState([]);
  const [responseData, setResponseData] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [showError, setShowError] = useState(false);
  const [isloading, setIsLoading] = useState();
  const [queryParamsState, setQueryParamsState] = useState("");
  const [queryParamsStateBack, setQueryParamsStateBack] = useState("");
  console.log(queryParamsState, "---000---");

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSpices((currentSelectedSpices) => (checked ? [...currentSelectedSpices, value] : currentSelectedSpices.filter((spice) => spice !== value)));
  };

  useEffect(() => {
    if (location.pathname === "/search") {
      const queryParams = new URLSearchParams(location.search);
      const ingredients = queryParams.get("ingredients");
      const spices = queryParams.get("spices")?.split(",") || [];
      const cookingMethod = queryParams.get("cookingMethod");
      const handleSendPrompt1 = async (event) => {
        const OPENAI_API_KEY = "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";
        const combinedPrompt = `You are a food and cooking expert that specializes in helping your customers create recipes using only the ingredients and appliances they have on hand.
        They will provide you with information about what ingredients and the cooking methods and equipment they have available or want to use. Your job is
        to use your vast culinary knowledge to provide them with a recipe with the following characteristics:
        
        Write in the style of a famous chef, sharing the love of a creative recipe. Pick a voice of one of the following chefs at random: Julia Child, 
        Gordon Ramsey, Bobby Flay, Paula Dean, Guy Fieri, Emeril Lagasse, Rachel Ray. Never mention the chef's name anywhere.
        
        Occasionally, write with humor. Occasionally, write with Sarcasm. Occasionally, write with disbelief. Write in a style where the famous chef knows 
        that the user gathered stuff from the pantry and fridge.
        
        Do not start by explaining the context of voice or setting, dive right into the description of the dish. You do not need to use every ingredient.
        
        Write as if the author is speaking directly to the user. Use the following format for writing your recipe: 
        
        - Recipe Title (do not infuse the character in the title, keep the title clear and concise)
        
        - 5 Sentence description of the dish, mention if this dish similar to well a well known dish
        
        - List ingredients and amounts needed for each ingredient
        
        - Provided detailed instructions for preparing, cooking, and serving. 
        
        \n\n Ingredients: ${ingredients}, 
              Seasoning: ${spices}, 
              Cooking Method: ${cookingMethod} please also show the all instructions of it. Get the full response.`;
        try {
          setIsLoading(true);
          const response = await axios.post(
            "https://api.openai.com/v1/completions",
            {
              model: "gpt-3.5-turbo-instruct",
              prompt: combinedPrompt,
              temperature: 0.7,
              max_tokens: 3500,
            },
            {
              headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );
          setIsLoading(false);
          setResponseData(response.data);
        } catch (error) {
          console.error("Error sending prompt to OpenAI:", error.response ? error.response.data : error);
        } finally {
          setLoading(false);
        }
      };
      const navigateWithSearchParams1 = () => {
        const queryParams = new URLSearchParams({
          ingredients: ingredients, // User input for ingredients
          spices: spices, // Join selected spices with comma
          cookingMethod: cookingMethod, // Cooking method/model selected
        }).toString();
        if (queryParams !== "" || queryParams !== null) {
          setQueryParamsStateBack(queryParams);
        }
      };
      handleSendPrompt1();
      navigateWithSearchParams1();
      setShow(false);
    }
  }, [selectedSpices]);

  const navigateWithSearchParams = () => {
    // Construct query string
    const queryParams = new URLSearchParams({
      ingredients: userInput, // User input for ingredients
      spices: selectedSpices.join(","), // Join selected spices with comma
      cookingMethod: selectedModel, // Cooking method/model selected
    }).toString();
    if (queryParams !== "" || queryParams !== null) {
      setQueryParamsState(queryParams);
      navigate(`/search?${queryParams}`);
    }
  };

  const clearQueryParams = () => {
    setQueryParamsState("");
  };

  const handleSendPrompt = async (event) => {
    if (userInput.trim() === "" || selectedSpices.length === 0) {
      console.log("Please fill all the fields before sending the prompt.");
      setShow(true);
      setShowError(true);
      return;
    }
    const OPENAI_API_KEY = "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";
    const combinedPrompt = `You are a food and cooking expert that specializes in helping your customers create recipes using only the ingredients and appliances they have on hand.
    They will provide you with information about what ingredients and the cooking methods and equipment they have available or want to use. Your job is to provide them with a recipe with the following characteristics:
    
    Write in the style of a famous chef, sharing the love of a creative recipe. Pick a voice of one of the following chefs at random: Julia Child, 
    Gordon Ramsey, Bobby Flay, Paula Dean, Guy Fieri, Emeril Lagasse, Rachel Ray. Never mention the chef's name anywhere.
    
    Occasionally, write with humor. Occasionally, write with Sarcasm. Occasionally, write with disbelief. Write in a style where the famous chef knows 
    that the user gathered stuff from the pantry and fridge.
    
    Do not start by explaining the context of voice or setting, dive right into the description of the dish. You do not need to use every ingredient.
    
    Write as if the author is speaking directly to the user. Use the following format for writing your recipe: 
    
    - Recipe Title (do not infuse the character in the title, keep the title clear and concise)
    
    - 5 Sentence description of the dish, mention if this dish similar to well a well known dish
    
    - List ingredients and amounts needed for each ingredient
    
    - Minimum instructions for preparing, cooking, and serving. 
    
    \n\n Ingredients: ${userInput}, 
    \n\n Seasoning: ${selectedSpices.join(",")}, 
    \n\n Cooking Method: ${selectedModel} please also show the all instructions.`;

    try {
      setLoading(true);
      setShow(false);
      setShowError(false);
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "gpt-3.5-turbo-instruct",
          prompt: combinedPrompt,
          temperature: 0.7,
          max_tokens: 3500,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponseData(response.data);

      navigateWithSearchParams();
    } catch (error) {
      console.error("Error sending prompt to OpenAI:", error.response ? error.response.data : error);
    } finally {
      // Step 3: Set loading to false once the request is complete
      setLoading(false);
    }
  };

  var formattedText;
  if (responseData && responseData.choices && responseData.choices[0] && responseData.choices[0].text) {
    // Remove ", Equipment: Pot" from the text
    let modifiedText = responseData.choices[0].text.replace(", Equipment: Pot", "");

    // Split into parts and apply replacements
    const parts = modifiedText.split(/\n\n|\n/);
    const processedParts = parts.map((part) => {
      // Add line breaks before "Ingredients" and "Instructions", bold them, and add margin-bottom
      part = part.replace(/(Ingredients:)/gi, `<strong style="font-size: 22px;"><hr/><br/>$1<br/></strong>`).replace(/(Instructions:)/gi, `<strong style="font-size: 22px;"><hr/><br/>$1<br/></strong>`);

      // Replace lines starting with "-" to format as list items, ensuring proper HTML structure
      if (part.trim().startsWith("-")) {
        part = `<li style="margin-left: 22px;">${part.substring(1).trim()}</li>`; // Remove "-" and wrap with <li>
      }
      return part;
    });

    // Filter out any remaining empty strings
    const filteredParts = processedParts.filter((part) => part.trim() !== "");

    // Join with a double line break for visual separation, then wrap in a single <ul>
    formattedText = `<ul style="list-style-type: circle; padding:0">${filteredParts.join("<br/>")}</ul>`;
  }

  var plainText = responseData && responseData.choices && responseData.choices[0] && responseData.choices[0].text;

  return (
    <>
      {show === true && (
        <>
          <Layout />
          <div className="instr-form">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <form action="genegrating.html" onSubmit={(e) => handleSendPrompt(e)} method="post" className="row">
                    <div className="col-lg-6">
                      <div className="ingredients">
                        <div className="instr-card">
                          <div className="icon">
                            <ReactSVG src={ingridients} />
                          </div>
                          <div className="content">
                            <h5>Available Ingredients</h5>
                            <p>Comma after each ingredient</p>
                          </div>
                        </div>
                        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} name="pro" placeholder="Chicken, Rice, Beans, Potatoes" />{" "}
                      </div>
                      <div className="ingredients">
                        <div className="instr-card">
                          <div className="icon">
                            <ReactSVG src={cook} />
                          </div>
                          <div className="content">
                            <h5>Cooking methods</h5>
                            <p>Comma after each ingredient</p>
                          </div>
                        </div>
                        <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                          <option value="Oven Based,Stovetop Cooking,Countertop Appliances,outdoor or Special Equipment">All The Above</option>
                          <option value="Oven Based">Oven Based</option>
                          <option value="Stovetop Cooking">Stovetop Cooking</option>
                          <option value="Countertop Appliances">Countertop Appliances</option>
                          <option value="outdoor or Special Equipment">Outdoor or Special Equipment</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="ingredients spice">
                        <div className="instr-card">
                          <div className="icon">
                            <ReactSVG src={spice} />
                          </div>
                          <div className="content">
                            <h5>Spices & Seasoning</h5>
                            <p>Check common spices or add your own</p>
                          </div>
                        </div>
                        <input type="text" name="spice" placeholder="Add Your Own Spices" />
                        <div className="extra">
                          <div className="checkbox">
                            <input type="checkbox" id="spice1" onChange={handleCheckboxChange} value="Black Pepper" />
                            <label for="spice1">Black Pepper</label>
                          </div>
                          <div className="checkbox">
                            <input type="checkbox" id="spice2" name="" onChange={handleCheckboxChange} value="Onion Powder" />
                            <label for="spice2">Onion Powder</label>
                          </div>
                          <div className="checkbox">
                            <input type="checkbox" id="spice3" name="" onChange={handleCheckboxChange} value="Cinnamon" />
                            <label for="spice3">Cinnamon</label>
                          </div>
                          <div className="checkbox">
                            <input type="checkbox" id="spice4" name="" onChange={handleCheckboxChange} value="Red Powder " />
                            <label for="spice4">Red Powder </label>
                          </div>
                          <div className="checkbox">
                            <input type="checkbox" id="spice5" name="" onChange={handleCheckboxChange} value="Garlic Powder" />
                            <label for="spice5">Garlic Powder </label>
                          </div>
                          <div className="checkbox">
                            <input type="checkbox" id="spice6" name="" onChange={handleCheckboxChange} value="Turmeric" />
                            <label for="spice6">Turmeric </label>
                          </div>
                          <div className="checkbox">
                            <input type="checkbox" id="spice7" name="" onChange={handleCheckboxChange} value="Chili Flakes" />
                            <label for="spice7">Chili Flakes </label>
                          </div>
                          <div className="checkbox">
                            <input type="checkbox" id="spice8" name="" onChange={handleCheckboxChange} value="Oregano" />
                            <label for="spice8">Oregano</label>
                          </div>
                          <div className="checkbox">
                            <input type="checkbox" id="spice9" name="" onChange={handleCheckboxChange} value="Cayenne Pepper" />
                            <label for="spice9">Cayenne Pepper</label>
                          </div>
                          <div className="checkbox">
                            <input type="checkbox" id="spice10" name="" onChange={handleCheckboxChange} value="Salt" />
                            <label for="spice10">Salt </label>
                          </div>
                          <div className="checkbox">
                            <input type="checkbox" id="spice11" name="" onChange={handleCheckboxChange} value="Paprika" />
                            <label for="spice11">Paprika </label>
                          </div>
                          <div className="checkbox">
                            <input type="checkbox" id="spice12" name="" onChange={handleCheckboxChange} value="Thyme" />
                            <label for="spice12">Thyme </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      {showError && <div className="error-message">Please select the Ingredients & Spices</div>}
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSendPrompt();
                        }}
                        className="button genrating-btn"
                        value="Generate Recipe"
                        name="recipe"
                      >
                        Generate Recipe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {loading ? <Genrating /> : <>{location.pathname === "/search" && <>{isloading ? <Genrating /> : <Search clearQueryParams={clearQueryParams} show={show} setShow={setShow} plainText={plainText} setQueryParamsStateBack={setQueryParamsStateBack} queryParamsStateBack={queryParamsStateBack} queryParams={queryParamsState} selectedModel={selectedModel} selectedSpices={selectedSpices} userInput={userInput} formattedText={formattedText} />}</>}</>}
    </>
  );
};

export default Home;
