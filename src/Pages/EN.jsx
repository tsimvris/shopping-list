import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./pageStyle.css";

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
  const getApiData = async () => {
    const response = await fetch(
      "https://fetch-me.vercel.app/api/shopping/items"
    )
      .then((response) => response.json())
      .then((response) => setGroceries(response.data));

    // update the state
  };
  useEffect(() => {
    getApiData();
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
      <h3 className="title">Recently used</h3>
      <StyledUl>
        {groceries &&
          groceries.map((item) => (
            <StyledLi key={item._id} className="item-container">
              {item.name.en}
            </StyledLi>
          ))}
      </StyledUl>
    </div>
  );
}
