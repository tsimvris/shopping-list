import React from "react";
import "../Pages/pageStyle.css";
import styled from "styled-components";
import StyledUl from "./StyleUl";
export default function RecentlyUsed() {
  return (
    <>
      <StyledTitle>Zuletzt Verwendet</StyledTitle>
      <StyledUl></StyledUl>
    </>
  );
}
const StyledTitle = styled.h3`
  padding-top: 20px;
  color: #bd93f9;
`;
