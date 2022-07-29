import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { saveToLocalStorage, loadFromLocalStorage } from "../LocalStorage";
import StyledInput from "../Components/StyledInput";
import StyledLi from "../Components/StyledLi";
import StyledUl from "../Components/StyleUl";

export default function English() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(loadFromLocalStorage("My Items") ?? []);

  useEffect(() => {
    saveToLocalStorage("My Items", items);
  });

  return (
    <div className="EnWrap">
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
      <h3 className="SecondaryTitle">What do you want to buy?</h3>

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
    </div>
  );
}
