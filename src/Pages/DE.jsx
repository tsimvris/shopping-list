import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./pageStyle.css";

import { saveToLocalStorage, loadFromLocalStorage } from "../LocalStorage";
import StyledInput from "../Components/StyledInput";
import StyledLi from "../Components/StyledLi";
import StyledUl from "../Components/StyleUl";

export default function Todo() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(loadFromLocalStorage("My Items") ?? []);

  useEffect(() => {
    saveToLocalStorage("My Items", items);
  });

  return (
    <div className="Wrap">
      <h2 className="title">Einkaufsliste</h2>
      <StyledUl>
        {items.map((item) => {
          return (
            <>
              <StyledLi
                onClick={() => {
                  setItems(items.filter((Item) => Item.id !== item.id));
                }}
                key={item.id}
              >
                {item.name}
              </StyledLi>
            </>
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
