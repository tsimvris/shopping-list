import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { saveToLocalStorage, loadFromLocalStorage } from "../LocalStorage";
import StyledInput from "../Components/StyledInput";

export default function Todo() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(loadFromLocalStorage("My Items") ?? []);

  useEffect(() => {
    saveToLocalStorage("My Items", items);
  });

  return (
    <div className="DeWrap">
      <h2 className="title">Einkaufsliste</h2>
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
      <h3 className="SecondaryTitle">Was willst du einkaufen?</h3>

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
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </form>
    </div>
  );
}
