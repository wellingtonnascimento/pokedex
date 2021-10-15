import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 97.5%;
  }
  html, body {
    height: 100%;
  }
  body {
    font-family: Roboto, Oxygen,Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #f3f3f3;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 1%, rgba(6,70,161,1) 24%, rgba(0,212,255,1) 74%);;
  }
  #root {
    max-width: 1080px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
