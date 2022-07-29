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
      <h2 className="title">Einkaufsliste</h2>

      <StyledUl>
        {items.map((item) => {
          return (
            <StyledLi
              onClick={() => {
                setItems(items.filter((Item) => Item.id !== item.id));
                console.log(groceries);
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
      <div>
        <h3 className="title">Zuletzt Verwendet</h3>
        <hr />
        <StyledUl>
          {groceries?.map((grocery) => {
            return (
              <StyledLi
                key={grocery._id}
                onClick={() => {
                  console.log("alive");
                  setItems([...items, { name: grocery.name.de, id: nanoid() }]);
                }}
              >
                {grocery.name.de}
              </StyledLi>
            );
          })}
        </StyledUl>
      </div>
    </div>
  );
}
