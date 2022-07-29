import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./pageStyle.css";

import { saveToLocalStorage, loadFromLocalStorage } from "../LocalStorage";
import StyledInput from "../Components/StyledInput";
import StyledLi from "../Components/StyledLi";
import StyledUl from "../Components/StyleUl";

export default function Deutsch() {
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
      <h2 className="title">Einkaufsliste</h2>
      <ul>
        {groceries &&
          groceries.map((item) => (
            <li className="item-container">
              {item.name.de}with Id:{item._id}
            </li>
          ))}
      </ul>
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
      <h3 className="title">Was willst du einkaufen?</h3>

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
          placeholder="Tippe um zu suchen..."
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </form>
    </div>
  );
}
