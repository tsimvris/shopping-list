import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./pageStyle.css";
import { saveToLocalStorage, loadFromLocalStorage } from "../LocalStorage";
import StyledInput from "../Components/StyledInput";
import StyledLi from "../Components/StyledLi";
import StyledUl from "../Components/StyleUl";
import RecentlyUsed from "../Components/RecentlyUsed";
import StyledSug from "../Components/StyledSuggestion";
import { search } from "fast-fuzzy";

export default function Deutsch() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(loadFromLocalStorage("My Items") ?? []);
  const [groceries, setGroceries] = useState();
  const [fuzzyResult, setFuzzyResults] = useState();
  useEffect(() => {
    saveToLocalStorage("My Items", items);
  });

  function fuzzy(inputValue) {
    setFuzzyResults(
      search(inputValue, groceries, {
        keySelector: (obj) => obj.name.de,
      })
    );
    return fuzzyResult;
  }

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
            fuzzy(inputValue);
          }}
        />
      </form>
      <div className="fuzzyRes">
        <h4 className="title">Vorschläge</h4>
        <StyledUl>
          {fuzzyResult?.map((result) => {
            return (
              <StyledSug
                key={result._id}
                onClick={() => {
                  setItems([
                    ...items,
                    { name: result.name.de, id: result._id },
                  ]);
                }}
              >
                {result.name.de}
              </StyledSug>
            );
          })}
        </StyledUl>
      </div>
      <RecentlyUsed />
    </div>
  );
}
