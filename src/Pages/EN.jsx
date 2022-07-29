import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { saveToLocalStorage, loadFromLocalStorage } from "../LocalStorage";
import StyledInput from "../Components/StyledInput";

export default function English() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(loadFromLocalStorage("My Items") ?? []);

  useEffect(() => {
    saveToLocalStorage("My Items", items);
  });

  return (
    <div className="DeWrap">
      <h2 className="title">Shopping List</h2>
      <ul className="ItemsUl">
        {items.map((item) => {
          return (
            <>
              <li
                onClick={() => {
                  setItems(items.filter((Item) => Item.id !== item.id));
                }}
                className="ItemsLi"
                key={item.id}
              >
                {item.name}
              </li>
            </>
          );
        })}
      </ul>
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
          type="text"
          value={inputValue}
          onSubmit={(event) => {
            event.preventDefault();
            setItems([...items, { name: inputValue, id: nanoid() }]);
            setInputValue("");
          }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </form>
    </div>
  );
}
