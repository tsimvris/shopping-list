import "./pageStyle.css";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { saveToLocalStorage, loadFromLocalStorage } from "../LocalStorage";
import StyledInput from "../Components/StyledInput";
import StyledLi from "../Components/StyledLi";
import StyledUl from "../Components/StyleUl";

export default function English() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(loadFromLocalStorage("My Items") ?? []);
  const [groceries, setGroceries] = useState();

  useEffect(() => {
    saveToLocalStorage("My Items", items);
  });
  async function getApi() {
    try {
      const response = await fetch(
        "https://fetch-me.vercel.app/api/shopping/items"
      );
      const dataResponse = await response.json();
      setGroceries(dataResponse.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="Wrap">
      <h2 className="title">Shopping List</h2>

      <StyledUl>
        {items.map((item) => {
          return (
            <StyledLi
              onClick={() => {
                setItems(items.filter((Item) => Item.id !== item.id));
              }}
              key={item.id}
            >
              {item.name}
            </StyledLi>
          );
        })}
      </StyledUl>
      <h3 className="title">What do you want to buy?</h3>

      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          setItems([...items, { name: inputValue, id: nanoid() }]);
          setInputValue("");
        }}
      >
        <StyledInput
          required
          type="search"
          placeholder="Type to search..."
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </form>
      <div className="fuzzyRes">
        <h4 className="title">Proposals</h4>
        <StyledUl>
          <StyledLi></StyledLi>
        </StyledUl>
      </div>
      <div>
        <h3 className="title">Recently used</h3>
        <hr />
        <StyledUl>
          {groceries?.map((grocery) => {
            return (
              <StyledLi
                key={grocery._id}
                onClick={() => {
                  console.log("alive");
                  setItems([...items, { name: grocery.name.en, id: nanoid() }]);
                }}
              >
                {grocery.name.en}
              </StyledLi>
            );
          })}
        </StyledUl>
      </div>
    </div>
  );
}
