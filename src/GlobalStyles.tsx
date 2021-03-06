import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary-darkest: hsl(213,48%,15%);
    --color-primary-darker: hsl(213,48%,30%);
    --color-primary-dark: hsl(213,48%,50%);
    --color-primary-normal: hsl(213,48%,70%);
    --color-primary-light: hsl(213,48%,85%);
    --color-primary-lighter: hsl(213,48%,95%);

    --color-triadic-green-darker: hsl(93,40%,30%);
    --color-triadic-green-dark: hsl(93,40%,45%);
    --color-triadic-green-normal: hsl(93,40%,70%);
    --color-triadic-green-light: hsl(93,40%,85%);
    --color-triadic-green-lighter: hsl(93,40%,95%);

    --color-triadic-red-darker: hsl(333,48%,30%);
    --color-triadic-red-dark: hsl(333,48%,45%);
    --color-triadic-red-normal: hsl(333,48%,70%);
    --color-triadic-red-light: hsl(333,48%,85%);
    --color-triadic-red-lighter: hsl(333,48%,95%);

    --color-grey-darker: hsl(213, 20%, 15%);
    --color-grey-dark: hsl(213, 20%, 30%);
    --color-grey-normal: hsl(213, 20%, 45%);
    --color-grey-light: hsl(213, 20%, 70%);
    --color-grey-lighter: hsl(213, 20%, 85%);
    --color-grey-lightest: hsl(213, 20%, 95%);
  }
  
  body {
    margin: 0;
    background-color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 600 })};
    font-family: 'Mulish', sans-serif;

    @media (max-width: 800px) {
      margin-top: 0;
    }
  }

  p, h1, h2, h3, h4, h5 {
    font-family: "Mulish", sans-serif;
  }

  a, button {
    cursor: pointer;
  }

  a, button, input {
    transition: all 0.15s ease-in-out;
  }

  /* Scrollbar */
  /* Width */
  ::-webkit-scrollbar {
    opacity: 0;
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--color-grey-lighter); 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    opacity: 0;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    opacity: 0;
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }

    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes slide-out {
    from {
      opacity: 1;
      transform: translateY(0px);
    }
    
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
`

export default GlobalStyles
