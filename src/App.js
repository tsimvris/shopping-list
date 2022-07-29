import "./App.css";
import styled from "styled-components";
import Deutsch from "./Pages/DE";
import English from "./Pages/EN";
import { Route, Routes, NavLink } from "react-router-dom";

console.clear();
export default function App() {
  return (
    <div className="App">
      <nav className="NavBar">
        <LinkButton to="/">DE</LinkButton>
        <LinkButton to="/english">EN</LinkButton>
      </nav>
      <Routes>
        <Route path="/" element={<Deutsch />} />
        <Route path="/english" element={<English />} />
      </Routes>
    </div>
  );
}
const LinkButton = styled(NavLink)`
  padding: 4px 12px;
  border: 1px solid #000;
  border-radius: 8px;
  background-color: #f8f8f2;
  text-decoration: none;
  color: #44475a;
  margin: 5px;
  &.active {
    background-color: #bd93f9;
    color: #f1fa8c;
  }
`;
